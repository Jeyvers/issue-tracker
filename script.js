// Get DOM elements
const issuesList = document.getElementById('issuesList');
const issuesInputForm = document.getElementById('issuesInputForm');
const issueId = chance.guid();
let issueStatus = 'Open';

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;

    const issue = {
        id: issueId,
        desc: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
    console.log(issue);
    if(localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    issuesInputForm.reset();
    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for( let i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues(); 
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for( let i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues(); 
}

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    issuesList.innerHTML = '';
    for( let i =0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].desc;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;  
        issuesList.innerHTML += `
            <div class ="output">
            <h6>Issue ID: ${id}</h6>
            <p><span class="label label-info">${status}</span></p>
            <h3>${desc}</h3>
            <p><span class="glyphicon glyphicon-time">${severity}</span></p>
            <p><span class="glyphicon glyphicon-user">${assignedTo}</span></p>
            <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
            <a href="#" onclick="deleteIssue('${id}')"  class="btn btn-danger">Delete</a>
            </div>
            `
    }
}


document.addEventListener('DOMContentLoaded', fetchIssues);
issuesInputForm.addEventListener('submit', saveIssue);