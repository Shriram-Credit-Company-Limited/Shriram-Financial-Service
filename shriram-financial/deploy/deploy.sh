#!/usr/bin/env bash
# ============================================================
#  Deploy script — builds and pushes the site to your server.
#  Usage:  ./deploy/deploy.sh
#  Requires: ssh access to the server, rsync installed locally.
# ============================================================
set -euo pipefail

# ---- EDIT THESE ----
SERVER_USER="ubuntu"                       # your SSH user
SERVER_HOST="your.server.ip.or.domain"     # server IP or hostname
REMOTE_DIR="/var/www/shriram"              # web root on the server
# --------------------

echo "→ Building site..."
npm run build

echo "→ Deploying dist/ to ${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR} ..."
rsync -avz --delete \
  -e "ssh" \
  dist/ "${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}/"

echo "✓ Deploy complete."
echo "  If this is the first deploy, make sure Nginx is configured"
echo "  (see deploy/nginx-shriram.conf) and SSL is set up via certbot."
