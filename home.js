// Real department data from faculty survey
var depts = [
    { name: "Behavioral & Community Health Sciences (BCHS)", good: "Niche idea generation, simulate health communication scenarios" },
    { name: "Epidemiology (EPI)", good: "Data simulation to practice disease modeling an statistical analysis without using real data and  identifying key concepts" },
    { name: "Biostatistics", good: "Assistance with coding in Stata or R (debugging, explaining functions, suggesting efficient code)" },
    { name: "Health Policy & Management", good: "Summarize current policies, compare policy approaches across states or countries" },
    { name: "Environmental & Occupational Health", good: "Mapping" },
    { name: "Infectious Diseases & Microbiology", good: "" },
    { name: "Genetics", good: "" }
  ];
  
  // All/Yes uses (permitted across departments)
  var allYes = [
    "Create writing outlines",
    "Grammar and spelling checks",
    "Summarize long documents/papers",
    "Explain complex concepts"
  ];
  
  // All/No uses (prohibited across departments)
  var allNo = [
    "Generate citations and find sources",
    "Input research data (personal identifiable information, research data)",
    "Read entire documents",
    "Write original responses"
  ];
  
  // Rubric rows for the checklist
  var rows = [
    "Literature review",
    "Qualitative coding",
    "Essay & reflective writing",
    "Statistical analysis",
    "Code & programming",
    "Community fieldwork notes",
    "Citations & references"
  ];
  
  // Build department dropdown
  var sel = document.getElementById("dept");
  depts.forEach(function(d) {
    var opt = document.createElement("option");
    opt.value = d.good || "No specific uses identified yet.";
    opt.textContent = d.name;
    sel.appendChild(opt);
  });
  
  // Build rubric table
  var tbody = document.getElementById("rubric-body");
  rows.forEach(function(label) {
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + label + "</td>" +
      "<td><input type='checkbox' data-label='" + label + "' data-type='permitted'></td>" +
      "<td><input type='checkbox' data-label='" + label + "' data-type='prohibited'></td>";
    tbody.appendChild(tr);
  });
  
  function showDept() {
    var note = document.getElementById("dept-note");
    var val = document.getElementById("dept").value;
    note.textContent = val ? "Good uses for this department: " + val : "";
    note.style.display = val ? "block" : "none";
  }
  
//   generate actual template sylabus 
  function generate() {
    var permitted = [], prohibited = [];
  
    document.querySelectorAll("input:checked").forEach(function(box) {
      if (box.dataset.type === "permitted") permitted.push(box.dataset.label);
      if (box.dataset.type === "prohibited") prohibited.push(box.dataset.label);
    });
  
    // if didnt choose any option then it will display this message
    if (!permitted.length && !prohibited.length) {
      alert("Please check at least one item.");
      return;
    }
  
    var html = "<p>The following policy outlines AI use expectations for this course.</p>";
  
    html += "<p><b>Always permitted (all courses):</b> " + allYes.join(", ") + ".</p>";
    html += "<p><b>Always prohibited (all courses):</b> " + allNo.join(", ") + ".</p>";
  
    if (permitted.length)
      html += "<p><b>Also permitted in this course:</b> " + permitted.join(", ") + ". Disclose all AI use in your submission.</p>";
  
    if (prohibited.length)
      html += "<p><b>Also prohibited in this course:</b> " + prohibited.join(", ") + ". Undisclosed use is an academic integrity violation.</p>";
  
    html += "<p>If unsure whether a specific use is permitted, ask before submitting.</p>";
  
    document.getElementById("output-text").innerHTML = html;
    document.getElementById("output").style.display = "block";
  }