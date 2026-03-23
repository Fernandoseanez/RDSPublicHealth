var depts = [
    { 
        name: "Behavioral & Community Health Sciences (BCHS)",
        good: "Simulate health communication scenarios, improve assessment design and implementation, generate reports for different stakeholder audiences, culturally competent communication" },
    {
        name: "Epidemiology (EPI)", 
        good: "Predictive modeling, protein structure prediction (AlphaFold), identifying complex problems and patterns within datasets, spatial modeling" },
    {
        name: "Biostatistics",
        good: "Assistance with coding in Stata, R, GIS, or SAS (debugging, explaining statistical functions, suggesting efficient code), and determining causal inference." },
    {
        name: "Health Policy & Management (HPM)", 
        good: "Summarize current policies, compare policy approaches across states or countries, legislative communication" },
    {
        name: "Environmental & Occupational Health (EOH)", 
        good: "Spatial modeling, optimizing sustainability initiatives, drafting safety procedures and manuals" },
    { 
        name: "Infectious Diseases & Microbiology (IDM)",
        good: "Predict biomolecular properties and structures" },
    {
        name: "Genetics",
        good: "AI tools for genetics research (AlphaFold 2&3, AlphaGenome, AlphaMissense, CRISPR-GPT)" }
    ];
  
  // All/Yes uses (permitted across departments)
  var allYes = [
    "Create writing, script, or speech outlines",
    "Grammar and spelling checks",
    "Summarize long documents or papers",
    "Explain complex concepts",
    "Image creation and presentation assistance",
    "Learning research techniques",
    "Translating documents from another language"
  ];
  
  // All/No uses (prohibited across departments)
  var allNo = [
    "Generate citations and find sources",
    "Input research data (personal identifiable information, cleaning research data)",
    "Reading entire documents in place of student review",
    "Write original responses (papers, projects, discussion boards, etc.)",
    "Decision making"
  ];
  
  // Rubric rows for the checklist
  var rows = [

    { 
        label: "Literature review",         
        hint: "organizing and combining sources (not having AI read for you)" },
    { 
        label: "Qualitative coding",         
        hint: "thematic analysis and interpretation" },
    { 
        label: "Essay and reflective writing", 
        hint: "structural help only, not drafting content" },
    { 
        label: "Statistical analysis",       
        hint: "running analyses or interpreting data" },
    { 
        label: "Programming",         
        hint: "writing or debugging code" },
    { 
        label: "Community fieldwork notes",  
        hint: "summarizing or organizing field notes" },
  ];
  
  // Build department dropdown
  var sel = document.getElementById("dept");
  depts.forEach(function(d) {
    var opt = document.createElement("option");
    opt.value = d.good;
    opt.textContent = d.name;
    sel.appendChild(opt);
  });
  
  // Build rubric table
  var tbody = document.getElementById("rubric-body");
  rows.forEach(function(row) {
    var tr = document.createElement("tr");
    tr.innerHTML = 
    "<td><b>" + row.label + "</b><br><small style='color:#888;'>" + row.hint + "</small></td>" +
    "<td><input type='checkbox' data-label='" + row.label + "' data-type='permitted'></td>" +
    "<td><input type='checkbox' data-label='" + row.label + "' data-type='prohibited'></td>";
    tbody.appendChild(tr);
  });

//   dept note
  function showDept() {
    var note = document.getElementById("dept-note");
    var val = document.getElementById("dept").value;
    
    if (val) {
        note.textContent = "Suggested uses for this department: " + val;
        note.style.display = "block";
    } else {
        note.style.display = "none";
    }
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
  
    // merge always + course-specific into one list each
    var allPermitted  = allYes.concat(permitted);
    var allProhibited = allNo.concat(prohibited);
  
    var html = "";
    
    // little preamble
    html += "<p>Understanding how and when to use generative AI tools (such as ChatGPT, Copilot) is quickly emerging as a necessary skill for work in public health. While the use of generative AI is generally discouraged so as not to hinder your academic success, generative AI tools are accepted in this class under specific circumstances. You are fully responsible for any information you submit that is informed by generative AI outputs (ensuring that it does not violate academic honesty standards, intellectual property laws, or standards of non-public research you are conducting through coursework), and your use of generative AI tools must be properly documented and cited for any work submitted in this course.</p>";


    // permitted bullet list
    html += "<p><b>Permitted Uses of AI:</b></p><ul>";
    allPermitted.forEach(function(item) {
      html += "<li>" + item + "</li>";
    });
    html += "</ul>";
  
    // prohibited bullet list
    html += "<p><b>Prohibited Uses of AI:</b></p><ul>";
    allProhibited.forEach(function(item) {
      html += "<li>" + item + "</li>";
    });
    html += "</ul>";

    // closing line
    html += "<p><b>If unsure whether a specific use is permitted, ask before submitting.</b></p>";
  
    document.getElementById("output-text").innerHTML = html;
    document.getElementById("output").style.display = "block";
    document.getElementById("output").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function downloadSyllabus() {
    var doc = new window.jspdf.jsPDF();
    var text = document.getElementById("output-text").innerText;

    doc.setFontSize(14);
    doc.text("AI Policy Syllabus", 15, 20);

    doc.setFontSize(11);
    var lines = doc.splitTextToSize(text, 150);
    doc.text(lines, 15, 35);

    doc.save("AI_Policy_Syllabus.pdf");
  }