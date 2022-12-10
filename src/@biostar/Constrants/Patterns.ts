export const Patterns = {
    Name: '^[a-zA-Z _.-]*$',
    EnAndArName: '^[a-zA-Z\u0621-\u064A\u0660-\u0669 _.-]*$',
  
    EnAndArNameWithSpaces: '^[^-s]^[a-zA-Z\u0621-\u064A\u0660-\u0669 _.-]*$',
    GName: '^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 _.-]*$',
    GNamePattern: '^[^-s]^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 _.-]*$',
    Password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*W+)(?=.{8,})$',
    Email: '[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$',
    EmailPattern:
      " /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
    Ext: '^[0-9]{5}*$',
    Address: '^[#.0-9a-zA-Zs, -]+$',
    Phone: '^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4,5})$',
    CompanyFounded: new Date().getFullYear().toString(),
    PhoneMinMaxValue: '14',
    YearModel: new Date().getFullYear().toString(),
    AddressFormat: '^[ws]+,[sw]+,(d){5},[A-Za-z]+$',
    // customAddressFormat: "^[\w\s]+,[\s\w]+,(\d){5},[A-Za-z]+$",
    customAddress: '^[#.0-9a-zA-Zs,\u0621-\u064A\u0660-\u0669 -]+$',
  
    PasswordPattern:
      '^(?=.*[-!@#$%&*_+=^/])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,100}$',
    AEN: '^[\u0621-\u064Aa-zA-Zd-_s]+$',
    lettersorsymbolsorspaces: /^([^0-9]*)$/,
    arAndEnName: '^[a-zA-Z\u0621-\u064A\u0660-\u0669 _.-]*$',
    complexPassword: '^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*'
  };
  