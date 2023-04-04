import React, { useState, useEffect } from 'react';
import Orders from './OrdersTableItem';

import Image01 from '../../../images/fauzan.png'
import Image02 from '../../../images/man.png'
import Image03 from '../../../images/woman.png'

function OrdersTable({
  selectedItems
}) {

  const orders = [
    {
      id: '0',
      image: Image01,
      order: '#123567',
      date: '22/01/2021',
      customer: 'Uchihaganteng',
      total: 'Rp.1.290.000',
      status: 'Refunded',
      items: '1',
      location: 'Jakarta', 
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '1',
      image: Image01,
      order: '#779912',
      date: '22/01/2021',
      customer: 'Yasuoggsekali',
      total: 'Rp.890.000',
      status: 'Approved',
      items: '2',
      location: 'Jakarta',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '2',
      image: Image02,
      order: '#889924',
      date: '22/01/2021',
      customer: 'Janganboros',
      total: 'Rp.890.000',
      status: 'Approved',
      items: '2',
      location: 'Bogor',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '3',
      image: Image01,
      order: '#897726',
      date: '22/01/2021',
      customer: 'Mainmulukapanbelajarnya',
      total: 'Rp.590.000',
      status: 'Pending',
      items: '1',
      location: 'Bogor',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '4',
      image: Image03,
      order: '#123567',
      date: '22/01/2021',
      customer: 'Ahkamubisaaja',
      total: 'Rp.390.000',
      status: 'Refunded',
      items: '1',
      location: 'Bogor',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '5',
      image: Image01,
      order: '#896644',
      date: '21/01/2021',
      customer: 'Maafsayakhilaf',
      total: 'Rp.590.000',
      status: 'Approved',
      items: '1',
      location: 'Jakarta',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '6',
      image: Image03,
      order: '#136988',
      date: '21/01/2021',
      customer: 'Gayanomorsatu',
      total: 'Rp.890.000',
      status: 'Approved',
      items: '1',
      location: 'Tangerang Selatan',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '7',
      image: Image03,
      order: '#442206',
      date: '21/01/2021',
      customer: 'Skillmembatu',
      total: 'Rp.1.290.000',
      status: 'Approved',
      items: '2',
      location: 'Tangerang Selatan',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '8',
      image: Image02,
      order: '#764321',
      date: '21/01/2021',
      customer: 'Lulusinakuya',
      total: 'Rp.890.000',
      status: 'Pending',
      items: '2',
      location: 'Tangerang Selatan',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '9',
      image: Image01,
      order: '#908764',
      date: '21/01/2021',
      customer: 'aamiinlulus',
      total: 'Rp.590.000',
      status: 'Refunded',
      items: '1',
      location: 'Jakarta',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All Orders <span className="text-slate-400 font-medium">442</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-slate-200">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">User Order</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Username</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Items</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Branch</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Payment type</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {
              list.map(order => {
                return (
                  <Orders
                    key={order.id}
                    id={order.id}
                    image={order.image}
                    order={order.order}
                    date={order.date}
                    customer={order.customer}
                    total={order.total}
                    status={order.status}
                    items={order.items}
                    location={order.location}
                    type={order.type}
                    description={order.description}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(order.id)}
                  />
                )
              })
            }
          </table>

        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
