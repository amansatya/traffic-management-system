import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Shield, MapPin, Globe } from 'lucide-react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        username: string;
        name: string;
        email: string;
        role: string;
        city: string;
        country: string;
    };
}

const ProfileModal = ({ isOpen, onClose, user }: ProfileModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Profile Information</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-1
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300/60
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:border-2
                    [&::-webkit-scrollbar-thumb]:border-transparent
                    [&::-webkit-scrollbar-thumb]:bg-clip-padding
                    hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/70
                    dark:[&::-webkit-scrollbar-thumb]:bg-gray-600/60
                    dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500/80
                    [&::-webkit-scrollbar-thumb]:transition-colors
                    [&::-webkit-scrollbar-thumb]:duration-200
                    [scrollbar-width:thin]
                    [scrollbar-color:rgb(156_163_175_/_0.6)_transparent]
                    dark:[scrollbar-color:rgb(75_85_99_/_0.6)_transparent]">

                    <div className="space-y-4 pr-2">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-border/20">
                                <User className="h-8 w-8 text-primary" />
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                                <Input id="name" value={user.name} readOnly className="bg-muted/50 border-muted/60 focus:border-muted transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                <Input id="email" value={user.email} readOnly className="bg-muted/50 border-muted/60 focus:border-muted transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                                <Input id="username" value={user.username} readOnly className="bg-muted/50 font-mono text-sm border-muted/60 focus:border-muted transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                                <Input id="role" value={user.role} readOnly className="bg-muted/50 border-muted/60 focus:border-muted transition-colors" />
                            </div>

                            <div className="border-t border-border/60 pt-4 mt-6">
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 bg-muted/20 p-2 rounded-md">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Location Information</span>
                                </div>

                                <div className="grid gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-sm font-medium flex items-center gap-2">
                                            <MapPin className="h-3 w-3" />
                                            City
                                        </Label>
                                        <Input id="city" value={user.city} readOnly className="bg-muted/50 border-muted/60 focus:border-muted transition-colors" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-sm font-medium flex items-center gap-2">
                                            <Globe className="h-3 w-3" />
                                            Country
                                        </Label>
                                        <Input id="country" value={user.country} readOnly className="bg-muted/50 border-muted/60 focus:border-muted transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileModal;