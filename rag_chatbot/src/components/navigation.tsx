import {
     SignInButton,
     SignOutButton,
     SignUpButton,
     SignedIn,
     SignedOut,
     UserButton,
} from '@clerk/nextjs'
import {Button} from "./ui/button"

export const Navigation = () => {
    return (
        <div className="border-b border-[var(--foreground)]/10">
            <div className='flex containerh-16 items-center justify-between px-4 mx-auto'>
                <div className='text-xl font-semibold'>RAG Chatbot</div>
                <div className='flex gap-2'>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button variant="ghost">Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton>
                            <Button variant="outline">Sign Out</Button>
                        </SignOutButton>
                        <UserButton/>
                    </SignedIn>
                </div>
            </div>
        </div>
    )
};