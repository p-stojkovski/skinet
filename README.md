# Project Name

Brief description of your .NET Core Web API project.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Build and Run](#build-and-run)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Why Async/Await?](#why-async-await)
- [Repository Pattern](#repository-pattern)

## Project Overview

Provide a concise overview of your project, including its purpose and main features.

## Prerequisites

List any prerequisites that developers need to have installed before they can use or contribute to the project. For example:
- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Visual Studio](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/) (optional)

## Getting Started

Guide users through the process of setting up the project locally. Include steps such as:
1. Clone the repository.
2. Install dependencies.
3. Configure any necessary settings.

## Project Structure

Explain the organization of your project's code. Highlight key directories and their purposes.

## Configuration

Detail any configuration options or settings that users might need to customize.

## Dependencies

List and briefly describe any third-party libraries or frameworks your project depends on.

## Build and Run

Provide instructions for building and running the project. Include any relevant commands or scripts.

## API Documentation

If applicable, provide documentation for your API. Include endpoints, request/response examples, etc.

## Testing

Explain how to run tests and include any guidelines for contributors regarding testing.

## Contributing

Include guidelines for contributors. Explain how others can contribute to your project, report issues, or submit pull requests.

## License

Specify the license under which your project is distributed.

## Why Async/Await?

So, imagine we had a way of doing things step by step, like following a recipe. Now, instead of waiting for each step to finish before moving on to the next one, we can multitask.

Let's say we're asking someone for information, like checking what's in stock at a store. If we ask and then wait for the answer without doing anything else, it's not very efficient, especially if it takes a while to get the information.

Making things asynchronous is like asking for the info and then doing other things while waiting. So, we're not just standing there doing nothing. Once we get the answer, we go back and continue with what we were doing.

This helps a lot when we have lots of requests coming in. If we didn't do it this way, each request would tie up our system until it gets what it needs, and that's not great for handling many requests at once.

So, making our code asynchronous is like having a more organized and efficient way of handling many tasks at the same time, making things work better, especially when dealing with lots of requests.

## Repository Pattern

### Goals:

- Decouple business code from data access
- Separation of concerns
- Minimize duplicate query logic
- Testability

### Consequences:

- Increased level of abstraction
- Increased maintainability, flexibility, testability
- More classes/interfaces - less duplicate code
- Business logic further away from the data
- Harder to optimize certain operations against the data source

### External packages - client:
- "bootstrap": "^5.1.3",
- "bootswatch": "^5.3.2",
- "font-awesome": "^4.7.0",
- "ngx-toastr": "^16.2.0",
- "ngx-bootstrap": "^10.2.0",
- "xng-breadcrumb": "^9.0.0",
- "ngx-spinner": "^15.0.1",
