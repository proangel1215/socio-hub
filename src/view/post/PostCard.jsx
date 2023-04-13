import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Avatar,
  Image,
  chakra,
  Link,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PostCard = ({ item, isPublic }) => {
  const { title, description, url, likes = 0, username } = item;
  const { userDetails } = useContext(AuthContext);
  // const { firstName, lastName, occupation, profileURL } = userDetails;
  const [like, setLike] = useState(false);

  const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          w="xs"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mx="auto"
        >
          <Image
            height={"84px"}
            fit="cover"
            src={
              isPublic ? item.profileURL : userDetails && userDetails.profileURL
            }
            alt="avatar"
            mx={"auto"}
            borderRadius="57px"
          />

          <Box py={5} textAlign="center">
            <Link
              display="block"
              fontSize="2xl"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontWeight="bold"
            >
              {isPublic
                ? item.name
                : userDetails &&
                  userDetails.firstName + " " + userDetails.lastName}
            </Link>
            <chakra.span
              fontSize="sm"
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              {isPublic
                ? item.occupation
                : userDetails && userDetails.occupation}
            </chakra.span>
          </Box>
        </Box>
      </Flex>
    </Popover>
  );

  return (
    <>
      <div className="col-sm-12 col-lg-6 col-xxl-4">
        <Card
          minH={"450px"}
          maxW={"sm"}
          my={2}
          className="post-card mx-sm-auto"
        >
          <CardBody p={2} className="card-image-parent">
            <Image
              objectFit={"contain"}
              width={"100%"}
              height={"230px"}
              src={url}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              className="card-image"
            />

            <Text className="px-3 py-2" fontSize="xl">
              {title.substr(0, 30)}...
            </Text>
            <Text fontSize="sm" className="px-3 py-1">
              {description.substr(0, 70)}...
            </Text>
          </CardBody>

          <CardFooter p={2}>
            <div className="flex justify-content-between w-100 px-3">
              <div className="flex">
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="right"
                    overlay={popoverHoverFocus}
                  >
                    <NavLink to={"/profile/" + username}>
                      <Avatar
                        size="sm"
                        name="Prosper Otemuyiwa"
                        src={
                          isPublic
                            ? item.profileURL
                            : userDetails && userDetails.profileURL
                        }
                        // src={"https://i.pravatar.cc/300"}
                      />
                    </NavLink>
                  </OverlayTrigger>
                </ButtonToolbar>
                <Text className="mx-2">
                  {isPublic
                    ? item.name
                    : userDetails &&
                      userDetails.firstName + " " + userDetails.lastName}
                </Text>
              </div>
              <div className="flex">
                <div className="like flex mx-2">
                  <button onClick={() => setLike((prev) => !prev)}>
                    {like ? (
                      <AiFillHeart color="red" size={18} />
                    ) : (
                      <AiOutlineHeart color="red" size={18} />
                    )}
                  </button>
                  <span className="px-1">{like ? likes + 1 : likes}</span>
                </div>
                <div className="comment flex mx-2">
                  <FaRegCommentDots color="green" size={18} />
                  <span className="px-1">{20}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default PostCard;
