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

#### Controllers

- Handles incoming requests and returns reponses to the client.
- Decorate with `@Controller('/whatever')`.
- String passed in the decorator is the path to be handled by controller.

#### Providers

- Providers are basically js classes declared as providers in a module.
- Can inject dependencies. (Objects can create various relationships with each other)
- Decorate with `@Injectable()`.
- Dependency injection are done through the constructor of classes.

#### Services

- Defined as providers but not all providers are services.

</details>
