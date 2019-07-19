const first = async promise => (await promise)[0]

export default {
    Query: {
        customer: (parent, {customerid}, { query }, info) => first(query(`SELECT * FROM customers WHERE customerid = "${customerid}"`)),
        customers: (parent, args, {query}, info) => query("SELECT * FROM customers"),
        products: (parent, { name }, {query}, info) => query(`SELECT * FROM products where LOWER(productname) LIKE "%${name}%"`),
    },
    Mutation: {
        updateCustomer: async (parent, { customerid, companyname }, { query }, info) => {
            await query(`UPDATE customers SET companyname = "${companyname}" WHERE customerid = "${customerid}"`)
            return first(query(`SELECT * FROM customers WHERE customerid = "${customerid}"`))
        }
    },
    Customer: {
        orders: ({customerid}, { last }, {query}, info) => query(`SELECT TOP ${last} * FROM orders WHERE customerid = "${customerid}" ORDER BY orderdate DESC`)
    },
    Order: {
        customer: ({customerid}, args, {query}, info) => first(query(`SELECT * FROM customers WHERE customerId = "${customerid}"`)),
        items: ({ orderid }, args, { query }, info) => query(`SELECT * FROM orderdetails where orderid = ${orderid}`)
    },
    OrderDetail: {
        product: ({ productid }, args, {query}, info) => first(query(`SELECT * FROM products where productid = ${productid}`)),
        order: ({ orderid }, args, {query}, info) => first(query(`SELECT * FROM orders where orderid = ${orderid}`))
    }
}