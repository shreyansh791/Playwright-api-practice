import { faker } from "@faker-js/faker";
import { test } from "@playwright/test"

test('faker demo', async ({ }) => {
    console.log(faker.person.firstName())
    console.log(faker.person.fullName())
    console.log(faker.person.gender())
    console.log(faker.person.jobTitle())
    console.log(faker.person.lastName())
    console.log(faker.date.anytime())
    console.log(faker.number.int())
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@gmail.com`

    console.log("Email - ", randomEmail)


});
