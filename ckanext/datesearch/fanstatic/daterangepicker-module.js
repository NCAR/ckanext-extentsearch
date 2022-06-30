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
                $('#start').val(moment.utc(param_start).format('YYYY-MM-DD'));
                $('#ext_startdate').val(param_start);
            }
            if (param_end) {
                $('#end').val(moment.utc(param_end).format('YYYY-MM-DD'));
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

	    //var earliest_date = this.options.earliest_publication_year.toString();
	    var earliest_date_str = "1700-01-01";
	    var earliest_date = moment(earliest_date_str, "YYYY-MM-DD")

            // Add a date-range picker widget to the <input> with id #daterange
            $('#start').datepicker({
		        format: "yyyy-mm-dd",
		        startDate: earliest_date_str,
                        clearBtn: true,
                        defaultViewDate: { year: 1850, month: 01, day: 25 },
                        //forceParse: false,
                        autoclose: true 
	        }).on('changeDate', function (ev) {
	            var fs = 'YYYY-MM-DDTHH:mm:ss';
	            //var fs = 'YYYY-MM-DD';
                var default_date_str = "1850-01-25";
                var start_date = moment(ev.date);
                var start_date_str = start_date.format('YYYY-MM-DD');
                var end_date_str = $('#end').val();
                var end_date = moment(end_date_str, "YYYY-MM-DD");

                if (start_date.isValid() && start_date_str != default_date_str) {

                   //Flip the dates if end date is before start date, this ensures correct order in search view for results.
                   if(end_date.isValid() && (start_date > end_date)) {
                       $('#ext_startdate').val(end_date.format(fs) + 'Z');
                       $('#ext_enddate').val(start_date.format(fs) + 'Z');
                   }
                   else {
                       $('#ext_startdate').val(start_date.utc().format(fs) + 'Z');
                   }
                   form.submit();
                }
            });

            // Add a year picker widget to the <input> with id #end
            $('#end').datepicker({
		        format: "yyyy-mm-dd",
		        startDate: earliest_date_str,
                        clearBtn: true,
                        defaultViewDate: { year: 2100, month: 01, day: 25 },
                        //forceParse: false,
                        autoclose: true
	        }).on('changeDate', function (ev) {
	            var fs = 'YYYY-MM-DDTHH:mm:ss';
	            //var fs = 'YYYY-MM-DD';
                var default_date_str = "2100-01-25";
                var end_date = moment(ev.date);
                var end_date_str = end_date.format('YYYY-MM-DD');
                var start_date_str = $('#start').val();
                var start_date = moment(start_date_str, "YYYY-MM-DD");
                if (end_date.isValid() && end_date_str != default_date_str) {

                   //Flip the dates if end date is before start date, this ensures correct order in search view for results.
                   if(start_date.isValid() && (end_date < start_date)) {
                       $('#ext_startdate').val(end_date.format(fs) + 'Z');
                       $('#ext_enddate').val(start_date.format(fs) + 'Z');
                   }
                   else {
                       $('#ext_enddate').val(end_date.format(fs) + 'Z');
                   }
                   form.submit();
                }
            });

        }
    }
});
