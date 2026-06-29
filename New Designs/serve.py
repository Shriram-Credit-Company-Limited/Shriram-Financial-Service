import http.server
import socketserver
import os

# Serve files from this script's directory, but map "/" to the About page
# so opening the bare port shows the page we're working on.
os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")

PORT = 4178
DEFAULT = "/about.html"


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # strip query/fragment so cache-busters like /?v=123 still map to the page
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path == "/":
            self.path = DEFAULT
        return super().do_GET()

    def end_headers(self):
        # Avoid stale cached versions while iterating.
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


class Server(socketserver.TCPServer):
    allow_reuse_address = True


with Server(("", PORT), Handler) as httpd:
    httpd.serve_forever()
