#!/usr/bin/env python

import glob
from subprocess import call

bitex_files = glob.glob('../bitex/*.js') + \
              glob.glob('../bitex/*/*.js')


closure_files =  glob.glob('../closure-library/*/*/*.js') + \
                 glob.glob('../closure-library/*/*/*/*.js') + \
                 glob.glob('../closure-library/*/*/*/*/*.js') + \
                 glob.glob('../closure-library/*/*/*/*/*/*.js')

closure_bootstrap_files = glob.glob('../closure-bootstrap/javascript/bootstrap/*.js')

all_files = bitex_files + closure_bootstrap_files # + closure_files

print '<?xml version="1.0" encoding="UTF-8"?>'
print '<!DOCTYPE translationbundle SYSTEM "translationbundle.dtd">'
print '<translationbundle lang="pt_BR">'

for name in all_files: 
  print '<!-- ' + name + ' -->'
  call(['java', '-jar', './closure-extract-messages.jar', 'bitex', name ])

print '</translationbundle>'
