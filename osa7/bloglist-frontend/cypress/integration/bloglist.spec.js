describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aku Ankka',
      username: 'aku2',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('aku2')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Aku Ankka is logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('user2')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'aku2', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('create').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('author')
      cy.get('#url').type('blog.com')
      cy.contains('save').click()
      cy.contains('new blog title')
    })

    it('A blog can be liked', function() {
      cy.contains('create').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('author')
      cy.get('#url').type('blog.com')
      cy.contains('save').click()
      cy.contains('new blog title')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.contains('create').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('author')
      cy.get('#url').type('blog.com')
      cy.contains('save').click()
      cy.contains('new blog title')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('removed blog new blog title')
    })

    it('Blogs are sorted by likes', function() {
      cy.createBlog({
        title: 'first blog',
        author: 'author1',
        url: 'blog1.com',
        likes: 5
      })

      cy.createBlog({
        title: 'second blog',
        author: 'author2',
        url: 'blog2.com',
        likes: 0
      })
      cy.contains('view').click()
      cy.contains('likes 5')
    })
  })
})