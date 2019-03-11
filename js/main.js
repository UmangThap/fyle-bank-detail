;(function(){
    var dataTable;
    var getData = function(city) {
        var city = city || '';
        var url = "https://vast-shore-74260.herokuapp.com/banks?city=" + city;
        return $.ajax({
            type :'GET',
            url : url,
        })
    }
    function makeDataTable(city){
        $('.outer-div').addClass('no-display');
        $('.n-loader').removeClass('no-display');
        var city = city || 'BENGALURU';
        //var city = (city.target) ? 'BENGALURU' : city;
        var data = getData(city)
        $.when(data).done(function(data){
            if ($.fn.DataTable.isDataTable( '#example' )) {
                dataTable.clear().rows.add(data)
                .draw().search('');
            }else{
                dataTable = $('#example').DataTable({
                    "processing": true,
                    "data" : data,
                    "columns": [
                        { "data": "ifsc" },
                        { "data": "bank_name" },
                        { "data": "branch" },
                        { "data": "address" }
                    ]
                });
            }
            $('.outer-div').removeClass('no-display');
            $('.n-loader').addClass('no-display');
        })
    }
    function newCountry(){
        var city = $(this).val();
        makeDataTable(city);
        //console.log('here');
    }
    $(document).ready(function() {
        makeDataTable();
        $('#country-select').change(newCountry);
        $('.ui.dropdown').dropdown();
    })
})();