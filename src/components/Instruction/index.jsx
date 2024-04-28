import React from "react";
import css from "./style.css";





const Instruction = () => {
  return (
    <div className="container">
     <div className="instruction__wraper">
      <h2>How to use Cashier?</h2>
      <h3>
        This website is designed to simplify the sales and accounting process
        for sellers. It offers the following features:
      </h3>

      <ol>
        <li className="first__li">
          <h3>Adding and Editing Products:</h3>
          <ul>
            <li>Go to the "Products" section.</li>
            <li>Click the "Add Product" button.</li>
            <li>
              Enter the product name, price, cost price, and description
              (optional).
            </li>
            <li>Click the "Save" button.</li>
            <li>
              You can edit any product by clicking on it and changing its
              details.
            </li>
            <li>To delete a product, click the "Delete" button next to it.</li>
          </ul>
        </li>

        <li className="first__li">
          <h3>Creating and Managing Visits:</h3>
          <ul>
            <li>Go to the "Visits" section.</li>
            <li>Click the "Create Visit" button.</li>
            <li>Select from the list the products you have sold.</li>
            <li>Enter the number of units sold for each product.</li>
            <li>Click the "Save" button.</li>
            <li>You can view all your visits, sorting them by date.</li>
            <li>To delete a visit, click the "Delete" button next to it.</li>
            <li>To view detailed information about a visit, click on it.</li>
          </ul>
        </li>

        <li className="first__li">
          <h3>Viewing Visit Details:</h3>
          <ul>
            <li>
              In the "Visits" section, find the visit you are interested in and
              click on it.
            </li>
            <li>
              You will see detailed information about the visit, including:
            </li>
            <ul>
              <li>A list of sold products and their quantities.</li>
              <li>The total sale amount</li>
              <li>The total cost price</li>
              <li>The total profit</li>
            </ul>

            <li>
              You can edit the number of sold products or the products
              themselves.
            </li>
            <li>
              Changes will automatically update the total sale amount, cost
              price, and profit.
            </li>
          </ul>
        </li>

        <li className="first__li">
          <h3>Automatic Calculation:</h3>

          <ul>
            <li>
              The website automatically calculates:
              <ul>
                <li>The total sale amount</li>
                <li>The total cost price</li>
                <li>The total profit</li>
              </ul>
            </li>
            <li>
              This data is available for each visit, as well as for all visits
              together.
            </li>
          </ul>
        </li>

        <li className="first__li">
          <h3>Additional Features:</h3>

          <ul>
            <li>You can export visit data in CSV format.</li>
            <li>You can generate reports on your sales.</li>
            <li>You can customize the website to suit your needs.</li>
          </ul>
        </li>

        <li className="first__li">
          <h3>Getting Started:</h3>
          <ul>
            <li>
              To get started with the website, you will need to create
              anaccount.
            </li>
            <li>
              Once you have created an account, you will be able to products,
              create visits, and view detailed information.
            </li>
          </ul>
        </li>
      </ol>

      <h3>We hope this website helps you with your business!</h3>
      </div>

    </div>
  );
};

export default Instruction;
