Part 2
1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

Component represents specific functionality in our application. They are reusable small blocks in our workflows. They are responsible for rendering the content in application as they return JSX. 
Pure components return the same JSX for the same set of state and props passed. i.e for the same inputs the component would return the same output. React would optimize the rendering performance of these components by running shouldComponentUpdate lifecycle method on these pure components. 
A class component is generally made pure by extending the class with React.PureComponent. If it is a functional component, we can wrap it using React.memo higher order component to behave like a pure component. 
Pure component would still re-render if a context that it is using gets changed. Also overusing them could cause performance bottleneck in our applications due to the shallow comparisons that react performs. 
One major issue in Pure components is that when parents passes an array to child component it would still re-render every time even though the content is same thus breaking the rules of pure component. This is because React does only a shallow comparison thus it compares only the reference is prop is an object. 
Example:
const App = () => {
return <Products prodArr = {[‘Shoes’,’Shirts’,’Pants’]}/>
}
class Products extends React.PureComponent {
render(){
	return(
		{this.props.prodArr.map((prod) => <div>{prod}</div>)}
)
}
}


2. Context + ShouldComponentUpdate might be dangerous. Why is that?
Context is used to share data between components. This can also go upto nested deep level and whenever a context value is changed, all the components using them gets re-rendered. 
On the other hand shouldComponentUpdate blocks the component from re-rendering when a prop or state is not modified and it some cases this might be dangerous as that component does not get re-rendered and the tree below it also does not get re-rendered.
For eg: Let us assume that we pass theme of an application using context throught the component tree. In cases where the theme is changed, we might want the entire application to update. If we had used shouldComponentUpdate in middle of the tree structure, it may accidently block the component from rendering which in turn would affect the component to use the updated theme. And this may in turn affect the components that gets rendered below them. 

3. Describe 3 ways to pass information from a component to its PARENT.
•	As a callback. We can pass information in a callback function to parent. The callback function is passed as a prop to child component  and the child calls this callback function and passes the data to parent.
•	Using context. Data can be easily shared using context.
•	Using Redux. We can use state management library such as redux to share data between parent and child components.


4. Give 2 ways to prevent components from re-rendering.
We can use shouldComponentUpdate lifecycle method and compare the checks and prevent the component from re-rendering. Also, if we make a component pure it wont re-render if the same set of state and props are passed. React.memo higher order component can be used in child components to prevent re-rendering whenever it receives the same set of props.
We can also make use useCallback and useMemo to prevent re-rendering whenever the dependencies passed to them are same. React caches the values and would return them if the same set of dependencies are passed to them.

5. What is a fragment and why do we need it? Give an example where it might
break my app.
React.fragments are used when we want a component to return multiple elements. They don’t create any element in the dom. They are used with <></> syntax.
React components have a certain limitation where we cannot return multiple elements from them. To overcome this, we use fragments to group them and return them as single element. 
Re-setting state works only one level deep when using react fragments.


6. Give 3 examples of the HOC pattern.
Higher order component pattern is a functionality where a component takes input as a component, does some functionality on them and returns enhanced component from them. It basically transforms into a different component which allows us to customize the behaviour of the components.
•	React.memo is a higher order component which can be used as means of memorization. They can be used in child components and React will return the same jsx if the props and state don’t change.
•	Redux’s connect is also a higher order component. 
•	Logging functionality can be done using HOC pattern which enables us to achieve consistent logging across the application.


7. What's the difference in handling exceptions in promises, callbacks
and async...await?
•	In promises, the exceptions are handled inside .catch block. We can handle error either at the end of the promise chain or for separate promise .then chain. The .catch method has error parameter which tells us about the information on the error.
•	In callbacks, the exceptions are handled by the function itself. The params received are error, response. We need to check for error parameters and display the error information accordingly. 
•	In async.. await , we use try catch block. Hence all the error exceptions are handled inside the catch block. The error parameters gives additional details on the error information.


8. How many arguments does setState take and why is it async.
The setState updater method takes one arguments which is the previous state value.  The setState actions are batched. If we have multiple setState methods inside an event handler, React would batch them and re-render the components only once.  If we want to behave as synchronous, we need to use the setState updater version to have the latest state value to be updated.
React’s setState is async because in order to increase the performance it waits until all the setState is completed and then performs the re-render of the component. 

9. List the steps needed to migrate a Class to Function Component.
•	Use function instead of class
•	Remove reference of ‘this’ throughout the component
•	Remove the constructor and render method
•	Use hooks wherever necessary. For eg: useState to be used for setting all the state variables
•	If there are lifecycle method such as componentDidMount, componentDidUpdate, componentWillUnmount they need to be replaced with useEffect hook.

10. List a few ways styles can be used with components.
•	Styles can be imported in the component files and can be used in className attribute for elements
•	Styles can be directly applied to elements using style={{}}
•	Tailwind css can be used to style components


11. How to render an HTML string coming from the server.
We can use dangerouslySetInnerHTML prop and set the value. We need to decode the string when dealing with HTML elements.
Eg: dangerouslySetInnerHTML={{ __html:  (<value>) }}

