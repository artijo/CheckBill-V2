"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"





export default function Home() {
  const [nameBecome, setNameBecome] = useState("");
  const [listname, setlistname] = useState<string[]>([]);
  const [product, setProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(1);
  const [listProduct, setListProduct] = useState<any>([
    
  ]);

  const handlleAdd = () => {
    // setlistname([...listname, nameBecome]);
    // const inputElement: any = document.querySelector('input[name="person"]');
    // if (inputElement) {
    //   inputElement.value = "";
    // }
    if(nameBecome === "") return;
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
    // const inputElement2: any = document.querySelector('input[name="price"]');
    // if (inputElement2) inputElement2.value = "";
    const inputElement3: any = document.querySelectorAll('input[name="ps"]');
    if (inputElement3) {
      inputElement3.forEach((checkbox: any) => (checkbox.checked = false));
    }
    if(product === "" || price === 0) return;
    if(selectedPs.length === 0) return;
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
    localStorage.removeItem("listname");
    localStorage.removeItem("listProduct");
  }
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
    <main className="min-h-screen">
      <div className="w-80 bg-white mx-auto p-4">
        <h1 className="text-center">CheckBill</h1>
        <label htmlFor="name" className="">
          รายชื่อคนที่มา
        </label>
        <br />
        <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          name="person"
          placeholder="ป้อนชื่อ"
          value={nameBecome}
          required
          onChange={(e) => setNameBecome(e.target.value)}
        />
        <Button variant="outline" onClick={handlleAdd}>เพิ่ม</Button>
        </div>
        {listname.length > 0 && (
          <div>
            <label htmlFor="product" className="">
              รายการ
            </label>
            <br />
            <Input
              type="text"
              name="product"
              placeholder="ป้อนชื่อรายการ"
              value={product}
              required
              onChange={(e) => setProduct(e.target.value)}
            />
            <label htmlFor="price" className="">
              ราคา
            </label>
            <br />
            <Input
              type="number"
              name="price"
              placeholder="ป้อนราคา"
              value={price}
              min={1}
              required
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <label htmlFor="ps" className="">
              คนที่ต้องจ่าย
            </label>
              {listname.map((name, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <input className="pr-2" type="checkbox" name="ps" value={name} required/>
                    {name}
                  </div>
                  {/* <Button variant="destructive" onClick={() => handlleRemovlistname(index)}>ลบ</Button> */}
                </div>
              ))}
        
            <Button variant="outline" onClick={handlleAddProduct}>เพิ่ม</Button>
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
                (product: any, index: number) =>
                   ( // Exclude index 0
                    <div key={index} className="flex justify-between">
                      <div className="">
                      {product.product} {(product.price).toLocaleString()} บาท <br />
                        {product.ps.map((name: string, psIndex: number) => (
                          <span key={psIndex} className="-mt-2 pr-2 text-slate-400">{name}</span>
                        ))}
                        </div>
                      <div>
                        {(product.price / product.ps.length).toLocaleString()} บาท
                      {/* <Button variant="destructive" className="ml-2" onClick={() => handlleRemoveProduct(index)}>
                        ลบ
                      </Button> */}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        <Button variant="destructive" onClick={handleRemoveall} className="mt-2">ล้างข้อมูล</Button>
      </div>
      <p className="absolute right-0 bottom-0 text-center">&copy; CheckBill by artijo. Version: 0.5</p>
    </main>
  );
}
