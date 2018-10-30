<!DOCTYPE html>

<html>
    <head>
        <title>Import csv file with jquery</title>
        <meta charset="utf-8" />
        <style>
            #container,#buttondiv{
                margin:0 auto;
                width:80%;
                overflow:auto;
            }
            table.gridtable {
                margin:0 auto;
                width:95%;
                overflow:auto;
                font-family: helvetica,arial,sans-serif;
                font-size:14px;
                color:#333333;
                border-width: 1px;
                border-color: #666666;
                border-collapse: collapse;
                text-align: center;
            }
            table.gridtable th {
                border-width: 1px;
                padding: 8px;
                border-style: solid;
                border-color: #666666;
                background-color: #F6B4A5;
            }
            table.gridtable td {
                border-width: 1px;
                padding: 8px;
                border-style: solid;
                border-color: #666666;
            }
            .badrowcount {
              background-color: coral;
            }
            .notnumeric {
              background-color: yellow;
            }
        </style>
    </head>

    <body>
      <div id="buttondiv">
        <input type="file" id="inputfile" />
        <input type="button" id="viewfile" value="Import file" />
        <br><br>
      </div>
      <div class="container" id="container">
        <table class="gridtable" id="tableMain">
            <!-- <thead>
              <tr class="tableheader">
                  <th>column-1</th>
                  <th>column-2</th>
                  <th>column-3</th>
                  <th>column-4</th>
                        ..
                        ..
                        ..
                  <th>column-N</th>
              </tr>
            </thead>
            <tbody>

            </tbody> -->
          </table>
      </div>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>

    <script src="main-chunking-method.js"> </script>

    </body>
</html>
