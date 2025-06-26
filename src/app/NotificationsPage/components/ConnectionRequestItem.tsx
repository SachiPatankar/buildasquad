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
    <div className="flex items-center gap-4 p-4 border-b">
      <Avatar className="h-10 w-10">
        <AvatarImage src={request.photo || '/placeholder.svg'} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-xs text-muted-foreground">Connection Request</div>
      </div>
      <Button size="sm" onClick={onAccept} className="mr-2">Accept</Button>
      <Button size="sm" variant="outline" onClick={onDecline}>Decline</Button>
    </div>
  );
} 