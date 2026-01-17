'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateOrderStatus } from '@/app/actions/orders';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

interface UpdateOrderStatusButtonProps {
  orderId: string;
  currentStatus: string;
}

export default function UpdateOrderStatusButton({
  orderId,
  currentStatus,
}: UpdateOrderStatusButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = async (newStatus: string) => {
    setIsLoading(true);
    const result = await updateOrderStatus(orderId, newStatus as 'PENDING' | 'COMPLETED' | 'FAILED');

    if (result.success) {
      setStatus(newStatus);
      toast.success('Order status updated');
      router.refresh();
    } else {
      toast.error(result.message || 'Failed to update order status');
    }
    setIsLoading(false);
  };

  return (
    <Select
      value={status}
      onChange={(e) => handleUpdate(e.target.value)}
      disabled={isLoading}
    >
      <option value="PENDING">Pending</option>
      <option value="COMPLETED">Completed</option>
      <option value="FAILED">Failed</option>
    </Select>
  );
}
