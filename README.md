# "Filter by year" extension for CKAN

## License
GNU Affero General Public License version 3 (AGPLv3)

## Contains external libraries
- [bootstrap-datepicker.js](https://github.com/eternicode/bootstrap-datepicker/), Apache License 2.0
- [Moment.js](http://momentjs.com/), MIT License

## Acknowledgement
Originally started by [Sean Hammond](https://github.com/seanh).

## Installation
cd /usr/lib/ckan/default/src
git clone https://github.com/NCAR/ckanext-datesearch.git
cd ckanext-datesearch
python setup.py develop

To check:  pip list
see 
ckanext-datesearch (0.3.0, /usr/lib/ckan/default/src/ckanext-datesearch)

Now add datesearch to your development.ini list of plugins.
