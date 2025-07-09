import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ConnectionRequestItemProps {
  request: any;
  onAccept: () => void;
  onDecline: () => void;
}

export default function ConnectionRequestItem({ request, onAccept, onDecline }: ConnectionRequestItemProps) {
  const name = `${request.first_name} ${request.last_name}`.trim();
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b w-full">
      <Avatar className="h-10 w-10 mx-auto md:mx-0 mb-2 md:mb-0" >
        <AvatarImage src={request.photo || '/placeholder.svg'} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 text-center md:text-left mb-2 md:mb-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-xs text-muted-foreground">Connection Request</div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <Button size="sm" onClick={onAccept} className="w-full md:w-auto">Accept</Button>
        <Button size="sm" variant="outline" onClick={onDecline} className="w-full md:w-auto">Decline</Button>
      </div>
    </div>
  );
} 