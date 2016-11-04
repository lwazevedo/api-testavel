describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  beforeEach((done) => {
    Books
            .destroy({
              where: {},
            })
            .then(() => Books.create(defaultBook))
            .then(() => {
              done();
            });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
                .get('/books')
                .end((err, res) => {
                  joiAssert(res.body, booksList);
                  done(err);
                });
    });
  });

  describe('Route GET /{id}', () => {
    it('should return a  books', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
                .get('/books/1')
                .end((err, res) => {
                  joiAssert(res.body, book);
                  done(err);
                });
    });
  });

  describe('Route POST /books', () => {
    it('should create a books', (done) => {
      const newBook = {
        id: 2,
        name: 'newBook',
        description: 'newDescription',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
                .post('/books')
                .send(newBook)
                .end((err, res) => {
                  joiAssert(res.body, book);
                  done(err);
                });
    });
  });
  describe('Route PUT /books/{id}', () => {
    it('should update a books', (done) => {
      const updateBook = {
        id: 1,
        name: 'update Book',
        description: 'updateDescription',
      };

      const updatedCount = Joi.array().items(1);
      request
                .put('/books/1')
                .send(updateBook)
                .end((err, res) => {
                  joiAssert(res.body, updatedCount);
                  done(err);
                });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a books', (done) => {
      request
                .delete('/books/1')
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(204);
                  done(err);
                });
    });
  });
});