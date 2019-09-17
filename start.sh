#!/bin/bash

yum install git -y

mkdir -p /var/www
git clone https://github.com/fabionolasco/itis-6177-week05.git /var/www

mkdir -p /var/test_db
git clone https://github.com/datacharmer/test_db.git /var/test_db

yum install firewalld -y
systemctl start firewalld
systemctl enable firewalld

yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
yum install nodejs -y

cd /var/www
npm install

yum install mariadb-server -y
systemctl start mariadb
systemctl enable mariadb
systemctl status mariadb

# mysql_secure_installation

# mysql -u root -p

# cd var/test_db
# mysql -t < employees.sql -u root -p
### source /var/test_db/employees.sql

# firewall-cmd --add-port=3306/tcp 
# firewall-cmd --permanent --add-port=3306/tcp

firewall-cmd --add-port=80/tcp && firewall-cmd --permanent --add-port=80/tcp

firewall-cmd --reload