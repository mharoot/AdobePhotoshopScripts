$( document ).ready(function() {
    var rdr = new FileReader();
    var item_meta = 'item_meta';
    var item_meta_col_index = -1;
    /** 
        Assuming the first row is the name of the columns we extract that row and create the table header.
        @return String html table header
     */
    function extract_header(columns) {
        var table_header = '<thead> <tr class="tableheader">';
        for (c = 0; c < columns.length; c++) {
            table_header += '<th>' + columns[c] + '</th>';
            if (columns[c] === item_meta) {                
                item_meta_col_index = c;
                console.log(c);
            }
        }
        table_header += '</tr> </thead>';
        return table_header
    }

    
    
    $('#viewfile').click(function(){
        rdr.onload = function(e) {
          const $tableMain = $('#tableMain');
          //get the rows into an array
          var therows = e.target.result.split("\n");
          //build a new table row
          $tableMain.append(extract_header(therows[0].split(",")));
          const tbody = document.createElement('tbody');
          $tableMain.append(tbody);

          // remove that first row since it is column names
          therows.splice(0, 1);
          $tbody = $tableMain.children('tbody');
          

          load_rows(therows, $tbody);
          //loop through the rows
        //   for (var row = 1; row < therows.length ; row++  ) {
            
        //     newrow += '<tr>';
        //     var columns = therows[row].split(",");
        //     for (c = 0; c < columns.length; c++) {
        //         newrow+="<td>" + columns[c]  +  "</td>";	
        //     }
        //     newrow += '</tr>';		
            
        //     $tbody.append(newrow);
        //     newrow = '';	
        //   }
          
        }
        rdr.readAsText($("#inputfile")[0].files[0]);
    });

    function load_rows(arr, $tbody){
        var chunk = 20;
        
        (function loop(i) {
            if (i >= arr.length) return; // all done
            $.each(arr.slice(i, i+chunk), function(key){
                var newrow = '<tr>';
                var columns = arr[key].split(",");
                for (c = 0; c < columns.length; c++) {
                    // there is 11 meta_item properties
                    if (item_meta_col_index === c) {
                        newrow+="<td><ul>";
                        for (i = 0; i < 11; i++) {
                            newrow+="<li>" + columns[c]+ "</li>";
                            c++;
                        }
                        
                        newrow+="</ul></td>";
                    } 
                    else {
                        newrow+="<td>" + columns[c]  +  "</td>";	
                    }
                }
                newrow += '</tr>';		
                
                $tbody.append(newrow);
            })
            setTimeout(loop.bind(null, i+chunk));
        })(0);

        
    }
});