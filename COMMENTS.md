# Developer Comments

- css issues - I had some issues with responsive design, how to set width so the Ideas wrap nicely without creating a horizontal scroll when adding more. There are definietly gaps in these html and css fundamentals that I need to fix.
- Typescript - Idea component was both an Idea and Idea form. I wasn't sure how to separate make a disintinction between these two types but also have the component share the types. So I used lots of optional types which I don't think was corrrect. Addtionally having the correct type when setting the IdeaContext. I wasn't sure about that.
- I tried some testing, but it was just taking me so long and I thought it much more time efficient to have you show me how to do it, and then build my understanding from there. I'm not sure if I was doing it correctly anyway.
- I can definitely take more time over the css to make things look nicer, I know I could easily find some inspiration on codepen or something. For example, I did add a Button component, but I didn't use it. I thought it would be better to get your feedback first.
- I don't know if context was overkill. Possibly. Before I just had the Idea Hook and passed down it's values from the App component. There were other ways to load in the localstorage data, like with using a useEffect hook, but I thought way was a bit cleaner.
- I reckon I spent 7-8 hours on this. Though wasted a lot of time trying to figure out how to test things, reading up on posts and documentation etc

### How will I continue to improve this?

- Better styling / design - maybe a dark / light mode option. I can create a theme file and then use that to style the components. Would would be the options and what would be the best bang for your buck.

- Complete testing

### How to view this project

https://idea-board-one.vercel.app/
