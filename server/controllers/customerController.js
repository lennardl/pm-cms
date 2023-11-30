const Customer = require('../models/customer');
const mongoose = require('mongoose');
const { getFlashMessages } = require('express-flash-message');
const { info } = require('console');

exports.homepage = async (req, res) => {
    const messages = getFlashMessages(req, "express-flash-message", "info")
    console.log(messages);

    const locals = {
        title:'PM Training - CMS'
    }

    let perPage = 6;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 

        const totalCustomers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        const count = await totalCustomers.length;
        
        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages
          });
         
      } catch (error) {
        console.log(error);
      }
};

exports.addCustomer = async (req, res) => {

    const locals = {
        title:' Add New Customer'
    }

    res.render('./customer/add', locals);
};

exports.postCustomer = async (req, res) => {

    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
      });

    const locals = {
        title:'New Customer Added'
    }

    try {
        await Customer.create(newCustomer);    
        await res.flash('info','New customer has been added');
        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
};

exports.view = async (req, res) => {

    try {
      const customer = await Customer.findOne({ _id: req.params.id })
  
      const locals = {
        title: "View Customer Data",
        description: "View a customer's information",
      };
  
      res.render('customer/view', {
        locals,
        customer
      })
  
    } catch (error) {
      console.log(error);
    }
  
  }

  exports.edit = async (req, res) => {

    try {
      const customer = await Customer.findOne({ _id: req.params.id })
  
      const locals = {
        title: "Edit Customer Data",
        description: "Edit a customer's details",
      };
  
      res.render('customer/edit', {
        locals,
        customer
      })
  
    } catch (error) {
      console.log(error);
    }
  
  }

  exports.editPost = async (req, res) => {
    try {
      await Customer.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now()
      });
      console.log(req.params.id)
      await res.redirect(`/edit/${req.params.id}`);
      console.log('redirected');
    } catch (error) {
      console.log(error);
    }
  }

  exports.deleteCustomer = async (req, res) => {
    try {
      await Customer.deleteOne({ _id: req.params.id });
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  }

  exports.searchCustomers = async (req, res) => {

    const locals = {
      title: "Search Customer Data",
      description: "Find customer",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const customers = await Customer.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });
  
      res.render("search", {
        customers,
        locals
      })
      
    } catch (error) {
      console.log(error);
    }
  
  }