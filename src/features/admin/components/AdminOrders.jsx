// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrdersAsync, resetOrderUpdateStatus, selectOrderUpdateStatus, selectOrders, updateOrderByIdAsync } from '../../order/OrderSlice'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Avatar, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import { useForm } from "react-hook-form"
// import { toast } from 'react-toastify';
// import {noOrdersAnimation} from '../../../assets/index'
// import Lottie from 'lottie-react'


// export const AdminOrders = () => {

//   const dispatch=useDispatch()
//   const orders=useSelector(selectOrders)
//   const [editIndex,setEditIndex]=useState(-1)
//   const orderUpdateStatus=useSelector(selectOrderUpdateStatus)
//   const theme=useTheme()
//   const is1620=useMediaQuery(theme.breakpoints.down(1620))
//   const is1200=useMediaQuery(theme.breakpoints.down(1200))
//   const is820=useMediaQuery(theme.breakpoints.down(820))
//   const is480=useMediaQuery(theme.breakpoints.down(480))

//   const {register,handleSubmit,formState: { errors },} = useForm()

//   useEffect(()=>{
//     dispatch(getAllOrdersAsync())
//   },[dispatch])


//   useEffect(()=>{
//     if(orderUpdateStatus==='fulfilled'){
//       toast.success("Status udpated")
//     }
//     else if(orderUpdateStatus==='rejected'){
//       toast.error("Error updating order status")
//     }
//   },[orderUpdateStatus])

//   useEffect(()=>{
//     return ()=>{
//       dispatch(resetOrderUpdateStatus())
//     }
//   },[])


//   const handleUpdateOrder=(data)=>{
//     const update={...data,_id:orders[editIndex]._id}
//     setEditIndex(-1)
//     dispatch(updateOrderByIdAsync(update))
//   }


//   const editOptions=['Pending','Dispatched','Out for delivery','Delivered','Cancelled']

//   const getStatusColor=(status)=>{
//     if(status==='Pending'){
//       return {bgcolor:'#dfc9f7',color:'#7c59a4'}
//     }
//     else if(status==='Dispatched'){
//       return {bgcolor:'#feed80',color:'#927b1e'}
//     }
//     else if(status==='Out for delivery'){
//       return {bgcolor:'#AACCFF',color:'#4793AA'}
//     }
//     else if(status==='Delivered'){
//       return {bgcolor:"#b3f5ca",color:"#548c6a"}
//     }
//     else if(status==='Cancelled'){
//       return {bgcolor:"#fac0c0",color:'#cc6d72'}
//     }
//   }


//   return (

//     <Stack justifyContent={'center'} alignItems={'center'}>

//       <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateOrder)}>

//         {
//           orders.length?
//           <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
//             <Table aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Order</TableCell>
//                   <TableCell align="left">Id</TableCell>
//                   <TableCell align="left">Item</TableCell>
//                   <TableCell align="right">Total Amount</TableCell>
//                   <TableCell align="right">Shipping Address</TableCell>
//                   <TableCell align="right">Payment Method</TableCell>
//                   <TableCell align="right">Order Date</TableCell>
//                   <TableCell align="right">Status</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>

//                 {
//                 orders.length && orders.map((order,index) => (

//                   <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

//                     <TableCell component="th" scope="row">{index}</TableCell>
//                     <TableCell align="right">{order._id}</TableCell>
//                     <TableCell align="right">
//                       {
//                         order.item.map((product)=>(
//                           <Stack mt={2} flexDirection={'row'} alignItems={'center'} columnGap={2}>
//                             <Avatar src={product.product.thumbnail}></Avatar>
//                             <Typography>{product.product.title}</Typography>
//                           </Stack>
//                         ))
//                       }
//                     </TableCell>
//                     <TableCell align="right">{order.total}</TableCell>
//                     <TableCell align="right">
//                       <Stack>
//                         <Typography>{order.address[0].street}</Typography>
//                         <Typography>{order.address[0].city}</Typography>
//                         <Typography>{order.address[0].state}</Typography>
//                         <Typography>{order.address[0].postalCode}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="right">{order.paymentMode}</TableCell>
//                     <TableCell align="right">{new Date(order.createdAt).toDateString()}</TableCell>

//                     {/* order status */}
//                     <TableCell align="right">

//                         {
//                           editIndex===index?(

//                         <FormControl fullWidth>
//                           <InputLabel id="demo-simple-select-label">Update status</InputLabel>
//                           <Select
//                             defaultValue={order.status}
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             label="Update status"
//                             {...register('status',{required:'Status is required'})}
//                             >
                            
//                             {
//                               editOptions.map((option)=>(
//                                 <MenuItem value={option}>{option}</MenuItem>
//                               ))
//                             }
//                           </Select>
//                         </FormControl>
//                         ):<Chip label={order.status} sx={getStatusColor(order.status)}/>
//                         }
                      
//                     </TableCell>

//                     {/* actions */}
//                     <TableCell align="right">

//                       {
//                         editIndex===index?(
//                           <Button>

//                             <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
//                           </Button>
//                         )
//                         :
//                         <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
//                       }

//                     </TableCell>

//                   </TableRow>
//                 ))}

//               </TableBody>
//             </Table>
//           </TableContainer>
//           :
//           <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

//             <Stack rowGap={'1rem'}>
//                 <Lottie animationData={noOrdersAnimation}/>
//                 <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no orders currently</Typography>
//             </Stack>
              

//           </Stack>  
//         }
    
//     </Stack>
    
//     </Stack>
//   )
// }









import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrdersAsync,
  resetOrderUpdateStatus,
  selectOrderUpdateStatus,
  selectOrders,
  updateOrderByIdAsync,
} from '../../order/OrderSlice';
import Lottie from 'lottie-react';
import { noOrdersAnimation } from '../../../assets/index';

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [editIndex, setEditIndex] = useState(-1);
  const orderUpdateStatus = useSelector(selectOrderUpdateStatus);

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (orderUpdateStatus === 'fulfilled') {
      alert('Status updated successfully');
    } else if (orderUpdateStatus === 'rejected') {
      alert('Error updating order status');
    }
  }, [orderUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetOrderUpdateStatus());
    };
  }, []);

  const handleUpdateOrder = (data) => {
    const update = { ...data, _id: orders[editIndex]._id };
    setEditIndex(-1);
    dispatch(updateOrderByIdAsync(update));
  };

  const editOptions = ['Pending', 'Dispatched', 'Out for delivery', 'Delivered', 'Cancelled'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-purple-100 text-purple-700';
      case 'Dispatched':
        return 'bg-yellow-100 text-yellow-700';
      case 'Out for delivery':
        return 'bg-blue-100 text-blue-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {orders.length ? (
        <div className="w-full overflow-auto max-w-screen-lg mt-5">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2">Order</th>
                <th className="border border-gray-200 px-4 py-2">Id</th>
                <th className="border border-gray-200 px-4 py-2">Item</th>
                <th className="border border-gray-200 px-4 py-2">Total Amount</th>
                <th className="border border-gray-200 px-4 py-2">Shipping Address</th>
                <th className="border border-gray-200 px-4 py-2">Payment Method</th>
                <th className="border border-gray-200 px-4 py-2">Order Date</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="text-center">
                  <td className="border border-gray-200 px-4 py-2">{index}</td>
                  <td className="border border-gray-200 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.item.map((product) => (
                      <div key={product.product._id} className="flex items-center gap-2 my-2">
                        <img
                          src={product.product.thumbnail}
                          alt={product.product.title}
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{product.product.title}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{order.total}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div>
                      <div>{order.address[0].street}</div>
                      <div>{order.address[0].city}</div>
                      <div>{order.address[0].state}</div>
                      <div>{order.address[0].postalCode}</div>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{order.paymentMode}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Date(order.createdAt).toDateString()}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {editIndex === index ? (
                      <select
                        defaultValue={order.status}
                        className="border border-gray-300 rounded px-2 py-1"
                        onChange={(e) => handleUpdateOrder({ status: e.target.value })}
                      >
                        {editOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {editIndex === index ? (
                      <button
                        onClick={() => handleUpdateOrder({ status: order.status })}
                        className="text-green-600 hover:text-green-800"
                      >
                        ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditIndex(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✎
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <Lottie animationData={noOrdersAnimation} className="w-60" />
          <p className="text-lg text-gray-500">There are no orders currently</p>
        </div>
      )}
    </div>
  );
};
