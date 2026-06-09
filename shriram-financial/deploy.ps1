$KEY  = "C:\Users\kiddo\Downloads\shriram-financial\ShriramFinancialServices.pem"
$SERVER = "ubuntu@13.234.46.220"
$ZIP  = "C:\Users\kiddo\Downloads\site.zip"
$DIST = "C:\Users\kiddo\Downloads\shriram-financial\shriram-financial\dist\*"

Write-Host "Building site..." -ForegroundColor Cyan
npm run build

Write-Host "Zipping..." -ForegroundColor Cyan
Compress-Archive -Path $DIST -DestinationPath $ZIP -Force

Write-Host "Uploading..." -ForegroundColor Cyan
scp -i $KEY $ZIP "ubuntu@13.234.46.220:/tmp/site.zip"

Write-Host "Deploying on server..." -ForegroundColor Cyan
ssh -i $KEY $SERVER "sudo rm -rf /var/www/html/* && sudo unzip -o /tmp/site.zip -d /var/www/html/ && sudo chown -R www-data:www-data /var/www/html/"

Write-Host "Done! Site is live at https://shriramfinancialservices.online" -ForegroundColor Green
