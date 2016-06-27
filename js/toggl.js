$(document).ready(function () {

	var URL_SERVICE = "http://togglexportapi.herokuapp.com/";
var dataSet = [];

var table = $('#data_table').DataTable({
	"data": dataSet,
	"bSort":false,
	"bPaginate": false,
	"bFilter":false,
	"aaSorting":false,
	"columnsDefs" : [
		{"searchable": false, "targets":"_all"}
	],
	buttons: ['csv'],
	"columns": [
		{data:'date'},
		{data:'entries.0.start'},
		{data:'entries.0.stop'},
		{data:'entries.1.start'},
		{data:'entries.1.stop'},
		{data:'aditional_time'},
		{data:'interval'},
		{data:'total_time'}
	],
	"language" : {
		"info" : "",
		"zeroRecords" : "Nenhum registro encontrado!"
	}
	});


var that = null;

$("#save-data").click(function () {
		var token_api = $('#tokenAPI').val();
		var data_inicio = $('#dataInicio').val();
		var data_fim = $('#dataFim').val();
		that = $(this);
                $.ajax({
                    type: 'POST',
					async: false,
                    url: URL_SERVICE + 'toggl_api/api/v1.0/time_entries',
                    data: {
						'api_token' : token_api,
                        'start' : data_inicio,
						'stop' : data_fim
                    },
                    success: function (response, textStatus, jqXHR) {

					var table_data = $('#data_table').DataTable();
					table_data.clear().draw();
					data = response.data
					// TODO : Mudar abordaem, pois pode ocorrer entries ser nulo
					data_table = $('#data_table').DataTable();
					table_data.rows.add(data).draw();

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
							var table_data = $('#data_table').DataTable();
							table_data.clear().draw();
                             console.log(jqXHR, textStatus, errorThrown)
                            //Utils.error('Por favor Tente novamente mais tarde!');
                    }
                });
});

});
