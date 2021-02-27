# Task Management Backend

This project is from a udemy course at https://www.udemy.com/course/nestjs-zero-to-hero/

## Notes

<details>
  <summary>Section 2</summary>

#### CLI Usage

- `nest new your_project_name` to generate a new nest project.
- `nest g module module_name` to generate a new module in your app. (g for generate)
- `nest g controller module_name --no-spec` to generate a new controller for said module. (--no-spec to not create test files)
- `nest g service module_name --no-spec` to generate a new service for said module.

#### Modules

- Used to organize application structure.
- Modules are classes annotated with `@Module()`.
- All nest apps should have at least one module.
- More info <a href="(https://docs.nestjs.com/modules" target="_blank">Here</a>.

#### Controllers

- Handles incoming requests and returns reponses to the client.
- Controller doesn't do business logics. Those are mainly for the service layer.
- Decorate with `@Controller('/whatever')`.
- String passed in the decorator is the path to be handled by controller.
- More info <a href="https://docs.nestjs.com/controllers" target="_blank">Here</a>.

#### Providers

- Providers are basically js classes declared as providers in a module.
- Can inject dependencies. (Objects can create various relationships with each other)
- Decorate with `@Injectable()`.
- Dependency injection are done through the constructor of classes.
- More info <a href="https://docs.nestjs.com/providers" target="_blank">Here</a>.

#### Services

- Defined as providers but not all providers are services.
- Singleton when wrapped with `@Injectable()` and provided to a module. (Same instance shared across the app)
- Before a class can use a service, it must be defined in the constructor of said class. (Nest takes care of the injection for us.)
- Main source of business logic.
- Usually called from controller.

#### Data Transfer Object

- Object with some data and passed along to other subsystems.
- Common concept in software development.
- Used to define shape of data for a specific case. Not to be confused with model/type definition.
- Recommended to use classes to define DTOs.
- Not mandatory.

</details>

<details>
<summary>Section 3</summary>

#### Pipes

- Operate on arguments to be processed by route handler.
- Can perform data transformation or validation.
- Can return either the original or modified data.
- Can throw exceptions.
- Class must implement `PipeTransform`.
- Every pipe must have `transform()` method.
- See `pipes/task-status-validation.pipe.ts` for an example.
- More info <a href="https://docs.nestjs.com/pipes" target="_blank">Here</a>.

</details>

<details>
<summary>Section 4</summary>

#### Object Relational Mapping (ORM)

- Technique for converting data between code and database.
- Allows to use code to send query to database.
  Entity is a class that maps to a db table/collection. (See `src/tasks/task.entity.ts` for an example)
- TypeORM docs are <a href="https://typeorm.io/#/" target="_blank">Here</a>.
</details>

<details>
<summary>Section 5</summary>

#### Password storage protip

- Don't store plain text password in your db.
- Bcrypt package will help for password hashing.
- Bcrypt has utilities to generate salts and password hashing.

#### Json Web Tokens

- Open source industry standard (RFC-7519)
- Signed by issuer using a secret or keypair.
- Verifies that the sender is who they claim to be.
- Usable for auth or secure exchange of data between parties.
- JWT structure contains header, payload and signature.
- JWT is signed with a secret and an expiry time.
- JWTs can decoded by anyone so they should not contain any sensitive infos such as passwords.
</details>

<details>
<summary>Section 7</summary>

#### Logging examples can be found in the following files

- `src/auth/auth.service.ts`
- `src/tasks/task.controller.ts`
- `src/tasks/task.repository.ts`
- `main.ts`

</details>
<details>
<summary>Section 8</summary>

#### Config usage

- Check `config` folder on how to setup configuration.
- `src/auth/auth.module.ts` on how you can use your config to hide your jwt secret.
- `src/config/typeorm.config.ts` on how you can setup your db with your configuration values.
- `main.ts` on how you can config your port.

</details>
