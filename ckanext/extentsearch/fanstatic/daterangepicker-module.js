this.ckan.module('daterangepicker-module', function ($) {
    return {
        initialize: function () {

            // Define a new jQuery function to parse parameters from URL
            $.urlParam = function(name) {
                var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results == null) { return null; } else { return decodeURIComponent(results[1]) || 0; }
            };

            // Pick out relevant parameters
            var param_start = $.urlParam('ext_dsstart');
            var param_end = $.urlParam('ext_dsend');
            //var param_start = dates[0].substring(1);
            //var param_end = dates[1].substring(0, dates[1].length - 1);

            // Populate the datepicker and hidden fields
            if (param_start) {
                $('#start').val(moment.utc(param_start).year());
                $('#ext_dsstart').val(param_start);
            }
            if (param_end) {
                $('#end').val(moment.utc(param_end).year());
                $('#ext_dsend').val(param_end);
            }

            // Add hidden <input> tags #ext_dsstart and #ext_dsend, if they don't already exist.
            var form = $("#dataset-search");
            // CKAN 2.1
            if (!form.length) {
                form = $(".search-form");
            }
            if ($("#ext_dsstart").length === 0) {
                $('<input type="hidden" id="ext_dsstart" name="ext_dsstart" />').appendTo(form);
            }
            if ($("#ext_dsend").length === 0) {
                $('<input type="hidden" id="ext_dsend" name="ext_dsend" />').appendTo(form);
            }

	    //    var earliest_publication_year = this.options.earliest_publication_year.toString();

            // Add a date-range picker widget to the <input> with id #daterange
            $('#start').datepicker({
		        startDate: "1800",
                endDate: "2200",
		        format: "yyyy",
                startView: 3,
                minViewMode: 2,
                keyboardNavigation: false,
                autoclose: true
	        }).on('changeDate', function (ev) {
	            //var fs = 'YYYY-MM-DDTHH:mm:ss';
                var start_date = moment(ev.date);
                var start_date_str = start_date.format('YYYY')
                var end_date_str = $('#end').val();
                var end_date = moment(end_date_str, "YYYY");
                // Flip the dates if end date is before start date, this ensures correct order in search view for results.
                if(end_date_str && start_date.isAfter(end_date, 'year')) {
                    $('#ext_dsstart').val(end_date_str);
                    //start_date.add('y', 1).subtract('s', 1);
                    $('#ext_dsend').val(start_date_str);
                }
                else {
                    $('#ext_dsstart').val(start_date_str);
                }
                form.submit();
            });

            // Add a year picker widget to the <input> with id #end
            $('#end').datepicker({
		        startDate: "1800",
                endDate: "2200",
		        format: "yyyy",
                startView: 3,
                minViewMode: 2,
                keyboardNavigation: false,
                autoclose: true
	        }).on('changeDate', function (ev) {
	            //var fs = 'YYYY-MM-DDTHH:mm:ss';
                var end_date = moment(ev.date);
                var end_date_str = end_date.format('YYYY')
                var start_date_str = $('#start').val();
                var start_date = moment(start_date_str, "YYYY");
                //Flip the dates if end date is before start date, this ensures correct order in search view for results.
                if(start_date_str && start_date.isAfter(end_date, 'year')) {
                    $('#ext_dsstart').val(end_date_str);
                    //start_date.add('y', 1).subtract('s', 1);
                    $('#ext_dsend').val(start_date_str);
                }
                else {
                    //end_date.add('y', 1).subtract('s', 1);
                    $('#ext_dsend').val(end_date_str);
                }
                form.submit();
            });

        }
    }
});
