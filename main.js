$( document ).ready(function() {
    var microtime_start = (Date.now() % 1000) / 1000;
    var rdr = new FileReader();
    /** 
        Assuming the first row is the name of the columns we extract that row and create the table header.
        @return String html table header
     */
    function extract_header(columns) {
        var table_header = '<thead> <tr class="tableheader">';
        for (c = 0; c < columns.length; c++) {
            table_header += '<th>' + columns[c] + '</th>';
        }
        table_header += '</tr> </thead>';
        return table_header
    }
    
    $('#viewfile').click(function () {
        rdr.onload = async function (e) {
          const $tableMain = $('#tableMain');
          //get the rows into an array
          var therows = e.target.result.split("\n");
          //build a new table row
          var newrow = extract_header(therows[0].split(",")) + '<tbody>';
          

          
          //loop through the rows
          for (var row = 1; row < therows.length ; row++  ) {
            newrow += '<tr>';
            //get the columns into an array
            var columns = therows[row].split(",");
            for (c = 0; c < columns.length; c++) {
                newrow+="<td>" + columns[c]  +  "</td>";	
            }

            newrow += '</tr>';					
          }
          newrow += '</tbody>';
          $tableMain.append(newrow);
          var microtime_end = (Date.now() % 1000) / 1000;
          console.log(microtime_start - microtime_end);
        }
        rdr.readAsText($("#inputfile")[0].files[0]);
    });
});