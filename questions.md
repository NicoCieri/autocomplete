# Questions and Answers

**1. What is the difference between Component and PureComponent? give an example where it might break my app.**

A PureComponent is a React Class Component that implements the shouldComponentUpdate method by its own. The component will re-render only if its props or state changes, improving performance by avoiding the unnecessary re-renders when the component's parent renders.
Since it does a shallow comparison, if the props or states have complex structures like objects or arrays, the changes won't be noticed, and it may cause unexpected behaviors.

**2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**

ShouldComponentUpdate is incapable of detecting context changes. So if the props and states of a component haven't changed, but the context does, then the component won't re-render, causing unexpected behaviors.

**3. Describe 3 ways to pass information from a component to its PARENT.**

First, using **callbacks**. They are functions passed as props from the parent to its child. The child will call the callback, and it may trigger a change on the parent, like a state change.

```
function Parent() {
  const callback = (value) => {
    console.log(value)
  }

  return <Child callback={callback} />
}

function Child({ callback }) {
  const handleClick = () => {
    callback('New Data')
  }

  return <button onClick={handleClick}>Call Callback</button>
}
```

Second, with **Lifting State Up**. The parent component has the state, the children receives the state, and they are able to change it by calling a callback received by props. This will update the parent state but also the children props.

```
function Parent() {
  const [data, setData] = React.useState('')

  const handleData = (data) => {
    setData(data)
  }

  return <Child onChange={handleData} data={data} />
}

function Child({ onChange, data }) {
  const handleClick = () => {
    onChange('New Data')
  }

  return (
    <>
      <p>{data}</p>
      <button onClick={handleClick}>Update Data</button>
    </>
  )
}
```

And at last, using **React Context**. Context allows to share data with all its children components. You can pass a method using context to a child, and this child can execute the method passing information to the parent.

```
const MyContext = React.createContext()

function Parent() {
  const handleData = (data) => {
    console.log(data)
  }

  <MyContext.Provider value={{ updateData: handleData }}>
    <Child />
  </MyContext.Provider>
}

function Child() {
  const context = React.useContext(MyContext)

  const handleClick = () => {
    context.updateData('New Data')
  }

  return <button onClick={handleClick}>Update with Context</button>
}
```

**4. Give 2 ways to prevent components from re-rendering.**

First, using the **shouldComponentUpdate** lifecycle method. It allows to compare the next props and state before the render, in order to compare them with the actual props and state. If it returns `false`, then the component won't re-render. You can only use it in Class Components.

Second, using **React.memo**. Like PureComponent but for functional components, it makes the component to re-render only if their props or state have changed.

**5. What is a fragment and why do we need it? Give an example where it might break my app.**

Since a component cannot return multiple elements, but must return a single node, Fragment is a component that allows multiple elements to be returned without the need to wrap them in a `div`. This is useful for keeping the DOM cleaner and more semantic, specialy for elements like `table` or `select`.

Some CSS styles that uses child selectors may have unexpected behaviors.

**6. Give 3 examples of the HOC pattern.**

- `withTranslation`: A HOC injects the `t` function for using i18n for internationalization as a prop.

```
function withTranslation(Component) {
  return function WrappedComponent(props) {
    const t = (key) => i18n.translate(key)
    return <Component {...props} t={t}>
  }
}
```

- `withRouter`: A HOC from React Router, that gives to the component access to some router props like `history`, `match` and `location`.

```
import { withRouter } from 'react-router-dom';

const ComponentWithRouter = withRouter(Component);
```

- `connect`: A HOC from React Redux, it connects the component to the Redux Store.

```
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

const ComponentWithRedux = connect(mapStateToProps)(Component);
```

**7. what's the difference in handling exceptions in promises, callbacks and async...await.**

Using **callbacks**, following the error-first callback, the first argument should be the error. If the first argument is not null, we will have to handle the error.

With **promises**, we handle the errors by using the `.catch` at the end of the promise chain. It will handle any error that may happen in any of the chain promises.

And with **async/await**, we handle the error using try/catch blocks. If an error happens on the try block, the catch block will be executed to handle de error.

**8. How many arguments does setState take and why is it async.**

The `setState` function receives two arguments. The first is an object describing the state changes, or an updater function that receives as params the current state and props, and returns the new state. The second is a callback that will be executed once the state is updated and the component re-rendered.

It is async for performance reasons. React batches all the setState into a single update.

**9. List the steps needed to migrate a Class to Function Component.**

- Replace the class declaration for a function declaration.
- Move the `return` from the render method.
- Remove all `this` keywords from state and props
- Replace the states using the `useState` hook.
- Change all the lifecycle methods using `useEffect`.
- Convert methods removing the `this` keyword.

**10. List a few ways styles can be used with components.**

- **Traditional CSS**: Write standard CSS in a separate file and import it in the component file. Use the classnames defined in the CSS as strings. You can also use preprocessors like SASS.
- **CSS Modules**: Write standard CSS in a separate file, then import it as a module and use the module properties as classNames.
- **Inline styles**: Use the `style` attribute for adding inline styles to an element.
- **CSS in JS libraries**: They allow to write css in javascript files. There are libraries like Styled Components that allows you to define components with its style and use them with JSX. For example:

```
import styled from `styled-components`

const styledTitle = styled.h1`
  font-size: 3rem;
`

const SomeComponent = () => {
  return <StyledTitle>I am the title</StyledTitle>
}
```

**11. How to render an HTML string coming from the server.**

You can use **dangerouslySetInnerHTML**. It is a prop used on HTML elements. It can be dangerous because it makes the code vulnerable to XSS attacks, since we don't have control of what we are rendering. It should be used only with trusted sources.
