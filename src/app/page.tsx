"use client";
import Image from "next/image";
import QRCode from 'qrcode.react';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

const generatePayload = require('promptpay-qr');


export default function Home() {
  const [nameBecome, setNameBecome] = useState("");
  const [listname, setlistname] = useState<string[]>([]);
  const [product, setProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(1);
  const [listProduct, setListProduct] = useState<any>([]);
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ amount, setAmount ] = useState(0);         
  const [ qrCode ,setqrCode ] = useState("sample");

  const handlleAdd = () => {
    // setlistname([...listname, nameBecome]);
    // const inputElement: any = document.querySelector('input[name="person"]');
    // if (inputElement) {
    //   inputElement.value = "";
    // }
    if (nameBecome === "") return;
    listname.push(nameBecome);
    setNameBecome("");
    localStorage.setItem("listname", JSON.stringify(listname));
  };
  const handlleAddProduct = () => {
    const selectedPs = Array.from(
      document.querySelectorAll('input[name="ps"]:checked')
    ).map((checkbox: any) => checkbox.value);
    // setListProduct([...listProduct, { product, price, ps: selectedPs }]);
    // const inputElement: any = document.querySelector('input[name="product"]');
    // if (inputElement) inputElement.value = "";
    const inputElement2: any = document.querySelector('input[name="price"]');
    if (inputElement2) inputElement2.value = "";
    const inputElement3: any = document.querySelectorAll('input[name="ps"]');
    if (inputElement3) {
      inputElement3.forEach((checkbox: any) => (checkbox.checked = false));
    }
    if (product === "" || price === 0 || Number.isNaN(price)) return;
    if (selectedPs.length === 0) return;
    listProduct.push({ product, price, ps: selectedPs });
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    setProduct("");
    setPrice(0);
  };

  const handlleRemovlistname = (index: number) => {
    const newListname = [...listname];
    newListname.splice(index, 1);
    setlistname(newListname);
  };
  const handlleRemoveProduct = (index: number) => {
    const newListProduct = [...listProduct];
    newListProduct.splice(index, 1);
    setListProduct(newListProduct);
    localStorage.setItem("listProduct", JSON.stringify(newListProduct));
  };
  const handleRemoveall = () => {
    setlistname([]);
    setListProduct([]);
    setPhoneNumber("");
    setqrCode("sample");
    localStorage.removeItem("listname");
    localStorage.removeItem("listProduct");
  };

  useEffect(() => {
    const listpd = localStorage.getItem("listProduct");
    const listname = localStorage.getItem("listname");
    if (listpd) {
      setListProduct(JSON.parse(listpd));
    }
    if (listname) {
      setlistname(JSON.parse(listname));
    }
  }, []);
  return (
    <main className="min-h-screen relative">
      <div className="w-96 bg-white mx-auto p-4">
        <h1 className="text-center">CheckBill</h1>
        <Label htmlFor="name" className="text-base">
          รายชื่อคนที่มา
        </Label>
        <br />
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            name="person"
            id="name"
            placeholder="ป้อนชื่อ"
            value={nameBecome}
            required
            onChange={(e) => setNameBecome(e.target.value)}
          />
          <Button onClick={handlleAdd}>
            เพิ่ม
          </Button>
        </div>
        <Separator className="my-4" />
        {listname.length > 0 && (
          <div>
            <Label htmlFor="product" className="text-base">
              รายการ
            </Label>
            <br />
            <Input
              type="text"
              name="product"
              placeholder="ป้อนชื่อรายการ"
              id="product"
              value={product}
              required
              onChange={(e) => setProduct(e.target.value)}
            />
            <Label htmlFor="price" className="text-base">
              ราคา
            </Label>
            <br />
            <Input
              type="number"
              name="price"
              placeholder="ป้อนราคา"
              id="price"
              min={1}
              required
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <div className="mt-2">
            <Label htmlFor="ps" className="text-base">
              คนที่ต้องจ่าย
            </Label>
            {listname.map((name, index) => (
              <div key={index} className="inline">
                  <input
                    className="ml-2 w-4 h-4"
                    type="checkbox"
                    name="ps"
                    id={name}
                    value={name}
                    required
                  />
                  <Label htmlFor={name} className="ml-1">{name}</Label>
                {/* <Button variant="destructive" onClick={() => handlleRemovlistname(index)}>ลบ</Button> */}
              </div>
            ))}
            </div>
            <Button onClick={handlleAddProduct}>
              เพิ่ม
            </Button>
          </div>
        )}
        {listProduct.length > 0 && (
          <div>
            <h2 className="text-center">สรุปรายการ</h2>
            <div className="flex justify-between">
              <h3>รายการ</h3>
              <h3 className="">จ่ายคนละ</h3>
            </div>
            <div>
              {listProduct.map(
                (
                  product: any,
                  index: number // Exclude index 0
                ) => (
                  <div key={index} className="flex justify-between">
                    <div className="">
                      {product.product} {product.price.toLocaleString()} บาท{" "}
                      <br />
                      {product.ps.map((name: string, psIndex: number) => (
                        <span
                          key={psIndex}
                          className="-mt-2 pr-2 text-slate-400 text-sm"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                    <div>
                      {(product.price / product.ps.length).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}{" "}
                      บาท
                      {/* <Button variant="destructive" className="ml-2" onClick={() => handlleRemoveProduct(index)}>
                        ลบ
                      </Button> */}
                    </div>
                  </div>
                )
              )}
            </div>
            <h3>สรุปยอดจ่ายรายคน</h3>
            <div>
              {listname.map((name: string, nameIndex: number) => {
                const totalAmount = listProduct.reduce(
                  (sum: number, product: any) => {
                    if (product.ps.includes(name)) {
                      return sum + product.price / product.ps.length;
                    }
                    return sum;
                  },
                  0
                );

                return (
                  <div key={nameIndex} className="flex justify-between">
                    <div>{name}</div>
                    <div>
                      {totalAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      บาท
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator className="my-4" />
            <div>
            <h3>รับเงินผ่าน QR promptpay (สำหรับผู้รับ)</h3>
            <Label htmlFor="phone" className="text-base">หมายเลขพร้อมเพย์</Label>
            <Input
              type="text"
              name="phone"
              placeholder="ป้อนหมายเลขพร้อมเพย์"
              id="phone"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Label htmlFor="amount" className="text-base">จำนวนเงิน(ไม่ใส่ก็ได้)</Label>
            <Input
              type="number"
              name="amount"
              placeholder="ป้อนจำนวนเงิน"
              id="amount"
              min={0}
              required
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <Button className="mt-2" onClick={() => setqrCode(generatePayload(phoneNumber, { amount }))}>
              สร้าง QR
            </Button>
            {qrCode !== "sample" && (
            <div className="mt-2 flex justify-center">
              <QRCode value={qrCode} />
            </div>
              )}
            </div>
          </div>
        )}
        {listname.length !== 0 && (
          
        <Button
          variant="destructive"
          onClick={handleRemoveall}
          className="mt-2 block ml-auto"
        >
          ล้างข้อมูล
        </Button>
        )}
      </div>
      <p className="absolute right-0 bottom-0 text-center">
        &copy; CheckBill by <a href="https://artijo.com" target="_blank">artijo.</a> Version: 0.5
      </p>
    </main>
  );
}
