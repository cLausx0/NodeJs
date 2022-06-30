const supertest = require('supertest');

const app = require('../src/app');

test('Deve inserir um estudante com sucesso', () => {
  return supertest(app).post('/students')
    .send({
      registration: '20221EWBJ0007',
      name: 'Luva de Pedreiro Ronaldo Sir',
      email: 'melhordetodos@pesqueira.ifpe.edu.br',
      birth_date: '07/07/2007',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.registration).toBe('20221EWBJ0007');
      expect(res.body.name).toBe('Luva de Pedreiro Ronaldo Sir');
      expect(res.body.email).toBe('melhordetodos@pesqueira.ifpe.edu.br');
      expect(res.body.birth_date).toBe('07/07/2007');
    });
});

test('Deve inserir outro estudante com sucesso', () => {
  return supertest(app).post('/students')
    .send({
      registration: '20221EWBJ0001',
      name: 'Rogerio Mito Ceni',
      email: 'melhorgoleiro@pesqueira.ifpe.edu.br',
      birth_date: '18/12/2005',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.registration).toBe('20221EWBJ0001');
      expect(res.body.name).toBe('Rogerio Mito Ceni');
      expect(res.body.email).toBe('melhorgoleiro@pesqueira.ifpe.edu.br');
      expect(res.body.birth_date).toBe('18/12/2005');
    });
});

test('Deve listar todos os estudantes', () => {
    return supertest(app).get('/students').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(22);
      expect(res.body[6].nome).toEqual('Igor José Ribeiro dos Santos');
      expect(res.body[11].registration).toEqual('20192EWBJ0035');
      expect(res.body[8].email).toEqual('jwbs@discente.ifpe.edu.br');
      expect(res.body[4].birth_date).toEqual('23/04/1998')
    });
  });

test('Deve listar um estudante', () => {
  return supertest(app).get('/students/22').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20221EWBJ0001');
    expect(res.body.name).toBe('Rogerio Mito Ceni');
    expect(res.body.email).toBe('melhorgoleiro@pesqueira.ifpe.edu.br');
    expect(res.body.birth_date).toBe('18/12/2005');
  });
});

test('Deve apagar um estudante', () => {
  return supertest(app).delete('/students/21').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20221EWBJ0007');
    expect(res.body.name).toBe('Luva de Pedreiro Ronaldo Sir');
    expect(res.body.email).toBe('melhordetodos@pesqueira.ifpe.edu.br');
    expect(res.body.birth_date).toBe('07/07/2007');
  });
});

test('Deve alterar um estudante', () => {
  return supertest(app).put('/students/22')
    .send({
        registration: '20221EWBJ0009',
        name: 'Luis Fabiano Matador de Galinha',
        email: 'fabuloso09@pesqueira.ifpe.edu.br',
        birth_date: '08/11/1980',
    }).then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        registration: '20221EWBJ0009',
        name: 'Luis Fabiano Matador de Galinha',
        email: 'fabuloso09@pesqueira.ifpe.edu.br',
        birth_date: '08/11/1980',
        id: 22,
      });
    });
});

test('Deve listar o estudante com os dados alterados', () => {
  return supertest(app).get('/students/22').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20221EWBJ0009');
    expect(res.body.name).toBe('Luis Fabiano Matador de Galinha');
    expect(res.body.email).toBe('fabuloso09@pesqueira.ifpe.edu.br');
    expect(res.body.birth_date).toBe('08/11/1980');
  });
});

test('Deve apagar outro estudante', () => {
  return supertest(app).delete('/students/22').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.registration).toBe('20221EWBJ0009');
    expect(res.body.name).toBe('Luis Fabiano Matador de Galinha');
    expect(res.body.email).toBe('fabuloso09@pesqueira.ifpe.edu.br');
    expect(res.body.birth_date).toBe('08/11/1980');
  });
});
