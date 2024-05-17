const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('apiCreateProject', project => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/`,
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },
        headers: { Authorization: accessToken }
    })
})

Cypress.Commands.add('apiGetAllProjects', () => {
    cy.request({
      method: 'GET',
      url: '/api/v4/projects/',
      headers: { Authorization: accessToken },
    })
})
  
  Cypress.Commands.add('apiDeleteProjects', () => {
    cy.apiGetAllProjects().then(res =>
      res.body.forEach(project => cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${project.id}`,
        headers: { Authorization: accessToken },
      }))
    )
})

Cypress.Commands.add('apiCreateIssue', issue => {
  cy.apiCreateProject(issue.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues`,
        body: {
          title: issue.title,
          description: issue.description
        },
        headers: { Authorization: accessToken },
      })
  })
})

Cypress.Commands.add('apiCreateLabel', (projectId, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels`,
    body: {
      name: label.name,
      color: label.color
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('apiCreateMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones`,
    body: { title: milestone.title },
    headers: { Authorization: accessToken },
  })
})