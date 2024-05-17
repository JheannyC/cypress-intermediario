import { faker } from '@faker-js/faker'

describe('Create issue', () => {
  beforeEach(() => cy.apiDeleteProjects())

  it('successfully', () => {
    const issue = {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(3),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
      }
    }

    cy.apiCreateIssue(issue)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title)
        expect(response.body.description).to.equal(issue.description)
      })
  })
})
