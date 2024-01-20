"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [nameBecome, setNameBecome] = useState("");
  const [listname, setlistname] = useState<string[]>([]);
  const [product, setProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [listProduct, setListProduct] = useState<any>([
    { product, price, ps: [] },
  ]);

  const handlleAdd = () => {
    setlistname([...listname, nameBecome]);
    const inputElement: any = document.querySelector('input[name="person"]');
    if (inputElement) {
      inputElement.value = "";
    }
    // localStorage.setItem("listname", JSON.stringify(listname));
  };
  const handlleAddProduct = () => {
    const selectedPs = Array.from(
      document.querySelectorAll('input[name="ps"]:checked')
    ).map((checkbox: any) => checkbox.value);
    setListProduct([...listProduct, { product, price, ps: selectedPs }]);
    const inputElement: any = document.querySelector('input[name="product"]');
    if (inputElement) inputElement.value = "";
    const inputElement2: any = document.querySelector('input[name="price"]');
    if (inputElement2) inputElement2.value = "";
    const inputElement3: any = document.querySelectorAll('input[name="ps"]');
    if (inputElement3) {
      inputElement3.forEach((checkbox: any) => (checkbox.checked = false));
    }
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
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
    localStorage.removeItem("listProduct");
  }
  useEffect(() => {
    const listpd = localStorage.getItem("listProduct");
    if (listpd) {
      setListProduct(JSON.parse(listpd));
    }
    console.log(listpd);
    console.log(listProduct);
  }, []);
  return (
    <main className="min-h-screen">
      <div className="w-80 bg-white mx-auto p-4">
        <h1 className="text-center">CheckBill</h1>
        <label htmlFor="name" className="">
          รายชื่อคนที่มา
        </label>
        <br />
        <input
          type="text"
          name="person"
          placeholder="ป้อนชื่อ"
          onChange={(e) => setNameBecome(e.target.value)}
        />
        <button onClick={handlleAdd}>เพิ่ม</button>
        {listname.length > 0 && (
          <div>
            <label htmlFor="product" className="">
              รายการ
            </label>
            <br />
            <input
              type="text"
              name="product"
              placeholder="ป้อนชื่อรายการ"
              onChange={(e) => setProduct(e.target.value)}
            />
            <br />
            <label htmlFor="price" className="">
              ราคา
            </label>
            <br />
            <input
              type="number"
              name="price"
              placeholder="ป้อนราคา"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <br />
            <label htmlFor="ps" className="">
              คนที่ต้องจ่าย
            </label>
            <br />
              {listname.map((name, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <input type="checkbox" name="ps" value={name} />
                    {name}
                  </div>
                  <button onClick={() => handlleRemovlistname(index)}>ลบ</button>
                </div>
              ))}
        
            <button onClick={handlleAddProduct}>เพิ่ม</button>
          </div>
        )}
        {listProduct.length > 1 && (
          <div>
            <h2>สรุปรายการ</h2>
            <div>
              {listProduct.map(
                (product: any, index: number) =>
                  index > 0 && ( // Exclude index 0
                    <div key={index} className="flex justify-between">
                      {product.product} {product.price} บาท
                      <div>
                        {product.ps.map((name: string, psIndex: number) => (
                          <div key={psIndex}>{name}</div>
                        ))}
                        {product.price / product.ps.length} บาท
                      <button onClick={() => handlleRemoveProduct(index)}>
                        ลบ
                      </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        <button onClick={handleRemoveall} className="text-right">ล้างข้อมูล</button>
      </div>
    </main>
  );
}
