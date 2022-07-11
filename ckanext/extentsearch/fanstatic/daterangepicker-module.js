this.ckan.module('daterangepicker-module', function ($) {
    return {
        initialize: function () {

            // Define a new jQuery function to parse parameters from URL
            $.urlParam = function(name) {
                var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results == null) { return null; } else { return decodeURIComponent(results[1]) || 0; }
            };

            // Pick out relevant parameters
            var param_start = $.urlParam('ext_startdate');
            var param_end = $.urlParam('ext_enddate');

            // Populate the datepicker and hidden fields
            if (param_start) {
                $('#start').val(moment.utc(param_start).year());
                $('#ext_startdate').val(param_start);
            }
            if (param_end) {
                $('#end').val(moment.utc(param_end).year());
                $('#ext_enddate').val(param_end);
            }

            // Add hidden <input> tags #ext_startdate and #ext_enddate, if they don't already exist.
            var form = $("#dataset-search");
            // CKAN 2.1
            if (!form.length) {
                form = $(".search-form");
            }
            if ($("#ext_startdate").length === 0) {
                $('<input type="hidden" id="ext_startdate" name="ext_startdate" />').appendTo(form);
            }
            if ($("#ext_enddate").length === 0) {
                $('<input type="hidden" id="ext_enddate" name="ext_enddate" />').appendTo(form);
            }

	        var earliest_publication_year = this.options.earliest_publication_year.toString();

            // Add a date-range picker widget to the <input> with id #daterange
            $('#start').datepicker({
		        startDate: earliest_publication_year,
                endDate: "+0d",
		        format: "yyyy",
                startView: 3,
                minViewMode: 2,
                keyboardNavigation: false,
                autoclose: true
	        }).on('changeDate', function (ev) {
	            var fs = 'YYYY-MM-DDTHH:mm:ss';
                var start_date = moment(ev.date);
                var end_date_str = $('#end').val();
                var end_date = moment(end_date_str, "YYYY");
                //Flip the dates if end date is before start date, this ensures correct order in search view for results.
                if(end_date_str && (start_date > end_date)) {
                    $('#ext_startdate').val(end_date.format(fs) + 'Z');
                    start_date.add('y', 1).subtract('s', 1);
                    $('#ext_enddate').val(start_date.format(fs) + 'Z');
                }
                else {
                    $('#ext_startdate').val(start_date.utc().format(fs) + 'Z');
                }
                form.submit();
            });

            // Add a year picker widget to the <input> with id #end
            $('#end').datepicker({
		        startDate: earliest_publication_year,
                endDate: "+0d",
		        format: "yyyy",
                startView: 3,
                minViewMode: 2,
                keyboardNavigation: false,
                autoclose: true
	        }).on('changeDate', function (ev) {
	            var fs = 'YYYY-MM-DDTHH:mm:ss';
                var end_date = moment(ev.date);
                var start_date_str = $('#start').val();
                var start_date = moment(start_date_str, "YYYY");
                //Flip the dates if end date is before start date, this ensures correct order in search view for results.
                if(start_date_str && (end_date < start_date)) {
                    $('#ext_startdate').val(end_date.format(fs) + 'Z');
                    start_date.add('y', 1).subtract('s', 1);
                    $('#ext_enddate').val(start_date.format(fs) + 'Z');
                }
                else {
                    end_date.add('y', 1).subtract('s', 1);
                    $('#ext_enddate').val(end_date.format(fs) + 'Z');
                }
                form.submit();
            });

        }
    }
});
