import MotorUpdate from '@/components/admin/MotorUpdate';
import { getMotorById } from '@/lib/actions/motor.action';

interface MotorUpdatePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MotorUpdatePage({ params }: MotorUpdatePageProps) {
    const { id } = await params;
    const data = await getMotorById(id);

    return <MotorUpdate id={id} data={data} />;
}
