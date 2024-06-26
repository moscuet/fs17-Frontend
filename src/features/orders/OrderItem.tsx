import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PrimaryButton } from '../../shared-components/CustomButton'
import { OrderReadDto } from './orderDto'
import theme from '../../theme/theme'
import { useNavigate } from 'react-router-dom'

interface OrderItemProps {
  order: OrderReadDto;
}


export default function OrderItem({ order }: OrderItemProps) {
  const navigate = useNavigate();

const handleClickDetails = (e: React.MouseEvent<HTMLButtonElement> ) => {
  e.stopPropagation();  
  navigate(`/order/${order?.id}`);
}
  return (
    <Box>
          <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant="h6">Order ID: {order?.id}</Typography>
            <Typography variant="body1" color = { theme.palette.info.main }>
              Total: ${order?.total?.toFixed(2)}
            </Typography>
            <Typography variant="body1" mb={2}>Status: {order?.status}</Typography>
            <PrimaryButton text="Details" onClick={handleClickDetails}/>          </Paper>
        </Box>
  )
}
