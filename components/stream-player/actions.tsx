"use client";
import { useTransition } from "react";
import {useRouter} from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
};

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {userId} = useAuth();

  const handleFollow = () => {
    startTransition(()=> {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(()=> toast.error("Something went wrong with follow"))
    })
  };
  const handleUnFollow = () => {
    startTransition(()=> {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`You are have unfollowed ${data.following.username}`))
        .catch(()=> toast.error("Something went wrong with unfollow"))
    })
  };


  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in")
    }
    if (isHost) return;

    if (isFollowing) {
      //Unfollow
      handleUnFollow();
    } else {
      //Follow
      handleFollow();
    }
  }

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white":"fill-none")} />
      {isFollowing ? "Unfollow":"Follow"}
    </Button>
  )
};

export const ActionsSkeleton = () => {
  return (
    <Skeleton className="h-10 w-full lg:w-24" />
  );
};
