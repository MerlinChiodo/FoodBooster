const assert = require('chai').assert
const testSource = require('../backend/passport-config')
const prisma = require('../backend/prismaClient')
const bcrypt = require('bcrypt')

let user = {
  name: 'Peter',
  email: 'peter@mail.com',
}

async function prepare () {
  try {
    await prisma.user.create({
      data: {
        id: 1000,
        name: user.name,
        email: user.email,
        answer: 'Hund',
        passwordHash: await bcrypt.hash('1234', 10),
      },
    })
  } catch (err) {
    console.log(err)
  }
}

async function endTest () {
  try {
    await prisma.user.delete({
      where: {
        id: 1000,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

describe('Passport-config', () => {
  it('searchUserByEmail should find the prepared user', async () => {
    await prepare()
    const foundUser = await testSource.searchUserByEmail(user.email)
    assert.notEqual(foundUser, undefined)
    assert.equal(foundUser.name, user.name)
    assert.equal(foundUser.email, user.email)
    await endTest()
  })

  it('searchUserByEmail should not find another user', async () => {
    const foundUser = await testSource.searchUserByEmail('does@not.exist')
    assert.equal(foundUser, undefined)
  })

  it('checkAuthenticated should block unauthenticated users', () => {
    const req = {
      isAuthenticated: () => false,
    }
    const res = {
      status: () => res,
      send: () => {},
    }
    const next = () => {
      assert.fail(
        'Control flow went through the check with an unauthenticated user')
    }
    testSource.checkAuthenticated(req, res, next)
  })

  it('checkAuthenticated should let authenticated users through', () => {
    let wentThroughNext = false
    const req = {
      isAuthenticated: () => true,
    }
    const res = {
      status: () => res,
      send: () => {},
    }
    const next = () => {
      wentThroughNext = true
    }
    testSource.checkAuthenticated(req, res, next)
    assert.equal(wentThroughNext, true,
      'The user was not let through even though they were authenticated')
  })

  it('checkUnauthenticated should block authenticated users', () => {
    const req = {
      isUnauthenticated: () => false,
    }
    const res = {
      status: () => res,
      send: () => {},
    }
    const next = () => {
      assert.fail(
        'Control flow went through the check with an authenticated user')
    }
    testSource.checkUnauthenticated(req, res, next)
  })

  it('checkUnauthenticated should let unauthenticated users through', () => {
    let wentThroughNext = false
    const req = {
      isUnauthenticated: () => true,
    }
    const res = {
      status: () => res,
      send: () => {},
    }
    const next = () => {
      wentThroughNext = true
    }
    testSource.checkUnauthenticated(req, res, next)
    assert.equal(wentThroughNext, true,
      'The user was not let through even though they were unauthenticated')
  })

  it('checkIfUser should let only the user specified in the request through',
    () => {
      let wentThroughNext = false
      const req = {
        user: {
          email: 'email1@test.com',
        },
        body: {
          email: 'email1@test.com',
        },
      }
      const res = {
        status: () => res,
        send: () => {},
      }
      const next = () => {
        wentThroughNext = true
      }

      testSource.checkIfUser(req, res, next)
      assert.equal(wentThroughNext, true,
        'The user was not let through even though they were the right user')
    })

  it('checkIfUser should not let users through that are not in the request',
    () => {
      const req = {
        user: {
          email: 'email1@test.com',
        },
        body: {
          email: 'email2@test.com',
        },
      }
      const res = {
        status: () => res,
        send: () => {},
      }
      const next = () => {
        assert.fail(
          'Control flow went through the check with the wrong user')
      }

      testSource.checkIfUser(req, res, next)
    })

  it('checkIfUser should block users that are not admins',
    () => {
      const req = {
        user: {
          isAdmin: false,
        },
      }
      const res = {
        status: () => res,
        send: () => {},
      }
      const next = () => {
        assert.fail(
          'Control flow went through the check with a non admin')
      }

      testSource.checkIfAdmin(req, res, next)
    })

  it('checkIfAdmin should not let users through that are admins',
    () => {
      let wentThroughNext = false
      const req = {
        user: {
          isAdmin: true,
        },
      }
      const res = {
        status: () => res,
        send: () => {},
      }
      const next = () => {
        wentThroughNext = true
      }

      testSource.checkIfAdmin(req, res, next)
      assert.equal(wentThroughNext, true,
        'The user was not let through even though they were an admin')
    })
})
