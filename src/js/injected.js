(function () {
    const $ = (selector, el = document) =>
      Array.from(el.querySelectorAll(selector) || []);

    const getContent = el =>
        `"${el.textContent
            .replace(/"/g, "\"\"")
            .replace("\n", "")
            .trim()
          }"`;

    const getHeaders = table =>
          $("th", table).map(getContent);

    const getRows = (table) => {
        const rows = $("tr", table);
        const td = rows.map(tr =>
                $("td", tr).map(getContent)
              );
        return td;
    };


    // Array<Array<String>> -> String
    const toCSV = data =>
      `data:text/csv;charset=utf-8,${
        encodeURIComponent(
          data
              .map(r => r.join(","))
              .join("\n")
        )}`;

    const formatDate = aDate =>
        `${aDate.getDate()}-${aDate.getMonth() + 1}-${aDate.getFullYear()}`;


    const getFrameContent = frame =>
      frame.contentWindow.document.body;

    // Get table
    const deepSelect = selector => item =>
    $("iframe", item)
        .concat($("frame", item))
        .map(getFrameContent)
        .map(deepSelect(selector))
        .reduce((acc, arr) => acc.concat(arr), []) // flatten array
        .concat($(selector, item));

    const firstCellIsDate = table =>
      $("td", table)[0].classList.contains("textHeader");

    const largestTable = deepSelect("table")(document.body)
        .reduce((largest, table) =>
          firstCellIsDate(table)
            ? table
            : largest
        );


    const headers = getHeaders(largestTable);
    const rows = getRows(largestTable);
    const data = [headers].concat(rows);
    const csv = toCSV(data);
    const link = document.createElement("a");
    link.setAttribute("href", csv);
    link.setAttribute("download", `table-${formatDate(new Date())}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
    link.remove();
}());
