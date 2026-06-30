#!/usr/bin/env python3
"""Tiny SSO-route endpoint for the homepage hero form.

POST /api/sso-route  {"mobile": "9876543210"}
  -> calls Meon/way2wealth get_sso_route SERVER-SIDE (the secret_key never
     leaves the box), then returns {"url": "<https journey url>?utm_source=sfs"}
     for the browser to redirect into (mobile pre-filled, OTP auto-triggered).

Runs on 127.0.0.1 behind nginx (proxy_pass) via systemd. Python stdlib only.
Secrets live in /opt/sso/config.json (NOT in the repo). See SETUP.md.
"""

import json
import os
import re
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

CONFIG_PATH = os.environ.get("SSO_CONFIG", "/opt/sso/config.json")
HOST = "127.0.0.1"
PORT = int(os.environ.get("SSO_PORT", "8791"))


def get_route(mobile):
    cfg = json.load(open(CONFIG_PATH))
    payload = {
        "company": cfg["company"],
        "workflowName": cfg["workflowName"],
        "secret_key": cfg["secret_key"],
        "notification": False,
        "unique_keys": {"mobile_number": mobile},
        "additional_info": {"utm_source": cfg.get("utm_source", "sfs")},
        "is_redirect": True,
        "redirect_url": cfg.get("redirect_url", ""),
    }
    req = urllib.request.Request(
        cfg["endpoint"],
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=12) as resp:
        data = json.load(resp)
    url = data.get("url") or data.get("short_url")
    if not url:
        return None
    # Force https (upstream returns http://) and tag for attribution.
    if url.startswith("http://"):
        url = "https://" + url[len("http://"):]
    sep = "&" if "?" in url else "?"
    return url + sep + "utm_source=" + cfg.get("utm_source", "sfs")


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path.split("?")[0] != "/api/sso-route":
            return self._send(404, {"error": "not found"})
        try:
            n = int(self.headers.get("Content-Length", 0) or 0)
            data = json.loads(self.rfile.read(n) or b"{}")
        except Exception:
            return self._send(400, {"error": "invalid json"})

        mobile = re.sub(r"\D", "", str(data.get("mobile", "")))[-10:]
        if len(mobile) != 10:
            return self._send(400, {"error": "invalid mobile"})

        try:
            url = get_route(mobile)
        except Exception as exc:  # noqa: BLE001
            print("[sso] upstream error:", exc)
            return self._send(502, {"error": "upstream error"})

        if not url:
            return self._send(502, {"error": "no route returned"})
        return self._send(200, {"url": url})

    def log_message(self, *args):
        pass  # keep journald quiet


if __name__ == "__main__":
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
