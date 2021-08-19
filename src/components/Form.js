import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import '../styles/form.css';
import Bill from './Bill';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import GetAppIcon from '@material-ui/icons/GetApp';
import uniqid from 'uniqid';
import DeleteIcon from '@material-ui/icons/Delete';


function Form() {

    const [items, setItems] = useState([{ name: 'tooth', tax: 10, price: 100, quantity: 3 }]);
    const [seller, setSeller] = useState({ name: '', phone: '', address: '' });
    const [buyer, setBuyer] = useState({ name: '', phone: '', address: '' });
    const [item, setItem] = useState({ name: '', price: '', tax: '', quantity: '' });

    const addItem = () => {
        const { name, price, tax, quantity } = item;
        if (name.length === 0 || price.length === 0 || tax.length === 0 || quantity.length === 0) return;
        setItems([...items, item]);
        setItem({ name: '', price: '', tax: '', quantity: '' })
        console.log(items);
    }

    const getTotal = () => {
        var total = 0;
        items.map(x => total += getAmount(x));
        return total;
    }

    const getAmount = (item) => {
        const cost = item.price * item.quantity;
        return cost + cost * item.tax / 100;
    }

    const generatePdf = () => {
        const doc = new jsPDF();
        const uuid = uniqid();
        doc.text(`Invoice id: ${uuid}`, 10, 10);
        doc.text(`Date: ${new Date().toISOString()}`, 10, 20);
        doc.text('Seller Details: ', 10, 40);
        doc.text(`Name: ${seller.name}`, 10, 50);
        doc.text(`Phone: ${seller.phone}`, 10, 60);
        doc.text(`Address: ${seller.address}`, 10, 70);
        const dis = 'Seller Details'.length+100;
        doc.text('Buyer Details: ', dis, 40);
        doc.text(`Name: ${buyer.name}`, dis, 50);
        doc.text(`Phone: ${buyer.phone}`, dis, 60);
        doc.text(`Address: ${buyer.address}`, dis, 70);
        

        var data = [];
        for(var i=0;i<items.length;i++){
            const temp = [i+1, items[i].name, items[i].price, items[i].quantity, items[i].tax, getAmount(items[i])];
            data.push(temp);
        }

        doc.autoTable({
            head: [['S.No.', 'Product', 'Price', 'Quantity', 'Tax', 'Amount']],
            body: data,
            startY: 85
        })
        doc.save(`invoice_${uuid}.pdf`);
    }

    const clear  = () => {
        setSeller({ name: '', phone: '', address: '' });
        setBuyer({ name: '', phone: '', address: '' });
        setItems([]);
        setItem({ name: '', price: '', tax: '', quantity: '' });
    }

    return (
        <div>
            <h1 style={{ marginLeft: 20 }}>Enter Details: </h1>
            <form noValidate autoComplete="off">
                <div className="row">
                    <div className="col m-2">
                        <h2>Seller Details</h2>
                        <div className='row jc-sb'>
                            <h3 style={{ marginRight: 20 }}>Name:</h3>
                            <TextField value={seller.name} onChange={(e) => setSeller({ ...seller, name: e.target.value })} label="Name" variant="filled" />
                        </div>
                        <div className='row jc-sb mt-1'>
                            <h3 style={{ marginRight: 20 }}>Phone:</h3>
                            <TextField value={seller.phone} onChange={(e) => setSeller({ ...seller, phone: e.target.value })} label="Phone" variant="filled" />
                        </div>
                        <div className='row jc-sb mt-1'>
                            <h3 style={{ marginRight: 20 }}>Address:</h3>
                            <TextField value={seller.address} onChange={(e) => setSeller({ ...seller, address: e.target.value })} label="Address" variant="filled" />
                        </div>
                    </div>
                    <div className="col m-2">
                        <h2>Buyer Details</h2>
                        <div className='row jc-sb'>
                            <h3 style={{ marginRight: 20 }}>Name:</h3>
                            <TextField value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} label="Name" variant="filled" />
                        </div>
                        <div className='row jc-sb mt-1'>
                            <h3 style={{ marginRight: 20 }}>Phone:</h3>
                            <TextField value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} label="Phone" variant="filled" />
                        </div>
                        <div className='row jc-sb mt-1'>
                            <h3 style={{ marginRight: 20 }}>Address:</h3>
                            <TextField value={buyer.address} onChange={(e) => setBuyer({ ...buyer, address: e.target.value })} label="Address" variant="filled" />
                        </div>
                    </div>
                </div>
            </form>
            <form noValidate autoComplete="off">
                <div className="m-2">
                    <h2>Add Items: </h2>
                    <div className="col">
                        <div className="row">
                            <TextField value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} style={{ marginRight: 10 }} label="Item Name" variant="filled" />
                            <TextField value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} label="Price in ₹" variant="filled" />
                        </div>
                        <div className="row mt-1">
                            <TextField value={item.tax} onChange={(e) => setItem({ ...item, tax: e.target.value })} style={{ marginRight: 10 }} label="Tax in %" variant="filled" />
                            <TextField value={item.quantity} onChange={(e) => setItem({ ...item, quantity: e.target.value })} label="Quantity" variant="filled" />
                        </div>
                        <Button onClick={addItem} variant="contained" color="secondary" style={{ maxWidth: 150, marginTop: 10 }}>
                            Add Item
                        </Button>
                    </div>
                </div>
            </form>
            <div className="bill m-2">
                <Bill items={items} setItems={setItems} />
                <div className="row jc-sb">
                    <h3>Total Amount: </h3>
                    <h3>₹ {getTotal(items)}</h3>
                </div>
            </div>

            <Button onClick={generatePdf} variant="contained" color="secondary" style={{ maxWidth: 200, margin: 10 }}>
                <GetAppIcon/> Download PDF
            </Button>
            <Button onClick={clear} variant="contained" color="secondary" style={{ maxWidth: 200, margin: 10 }}>
                <DeleteIcon/> Clear
            </Button>
        </div>
    )
}

export default Form
