(function () {
    const $ = (selector, el = document) =>
      Array.from(el.querySelectorAll(selector) || []);

    const getContent = el =>
        `"${el.textContent.replace(/"/g, "\"\"")}"`;

    const getHeaders = table =>
          $("th", table).map(getContent);

    const getRows = table =>
          $("tr", table)
              .map(tr =>
                $("td", tr).map(getContent)
              );

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

    // Get table
    const largestTable = $("table")
        .reduce((largest, table) =>
          largest && $("tr", table).length > $("tr", largest).length
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
