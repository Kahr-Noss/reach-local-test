Hell, I'm Maxime COLLODEL, and here is my code for the ReachLocal Japan Programming Test.
This application was made using create-react-app as basis.

## Set up

To run it, clone the repository
git clone https://github.com/Kahr-Noss/reach-local-test.git

Then install the dependancies using
npm i

Then start the application using 
npm run start

Then open the page in your browser, it should be automatic, but in case of fail it would be this one:
http://localhost:3000/

The automated tests are only done for the component BuyStocks.
You can run them uing npm run test.

## Presentation

The application uses React and Redux as requested.
The redux store connect directly to the provided API to get real time data from the stocks.

- Compare Stocks

The graphs have been done with C3js (I modified a bit the provided package because of a refresh bug when removing data).
C3js provide an option to show/hide data, but I still add a menu on the left to do it.

To add a new company on the graph, just type its code and click on add. (like GOOGL, AMZN or AAPL)
Removing data can be done by clicking on the cross.
Date can be changed by the date pickers and click on load to refresh the data.

- Buy stocks

Like the previous module, the company code must be inputed, then the quantity.
The possible errors will be displayed as you fill the form.
The buy button will be disabled if there are errors or if you are outside of openning hours. (you can modify the current time by replacing 'date' in the file \src\utils\isStockExchangeOpen.js if you want)

-- My cart

This module will display all the stocks you bought for this session.
By clicking 'remove', you delete them from your cart
By clicking 'edit', you can change the quantity you bought, but still with the same limitations (except opening hours)
You need to validate for the change to be applied.

