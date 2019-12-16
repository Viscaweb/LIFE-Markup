Install
=======

You need to have nodejs

Then to install node modules:
npm install

Then to compile and minify:
grunt build

If you only want to compile:
grunt less:development

While editing less files, it's possible to auto-compile:
grunt watch

Test
====

Requirements
------------
(2019, December Note: I've never needed this vagrant stuff, just npm install and `grunt`)
* Virtualbox : https://www.virtualbox.org/wiki/Downloads
* Vagrant : https://www.vagrantup.com
* Maybe you will need some vagrant plugins...

Run
---

1. Run : vagrant up
2. Run : vagrant share
3. Try it, run : open http://ls-markup.vagrant
3. Go to : http://www.browserstack.com/screenshots/ and copy past the hostname
