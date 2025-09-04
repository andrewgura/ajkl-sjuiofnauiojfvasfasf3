"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/shared/SelectInput";
import { Clock, MessageSquare, Info, AlertTriangle } from "lucide-react";
import { BannerType, BannerSettings, BANNER_TYPES } from "./types";
import ToggleButton from "./ToggleButton";

const BannerManagementClient: React.FC = () => {
    const [bannerMessage, setBannerMessage] = useState<string>("");
    const [bannerType, setBannerType] = useState<string>(BANNER_TYPES.general);
    const [expiryEnabled, setExpiryEnabled] = useState<boolean>(false);
    const [expiryDateTime, setExpiryDateTime] = useState<string>("");
    const [logoutAllUsers, setLogoutAllUsers] = useState<boolean>(false);

    const bannerTypes: Record<string, BannerType> = {
        warning: {
            label: "Warning",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            textColor: "text-red-800",
            iconColor: "text-red-600",
            icon: <AlertTriangle className="h-4 w-4" />,
        },
        info: {
            label: "Information",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200",
            textColor: "text-amber-800",
            iconColor: "text-amber-600",
            icon: <Info className="h-4 w-4" />,
        },
        general: {
            label: "General",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-800",
            iconColor: "text-blue-600",
            icon: <MessageSquare className="h-4 w-4" />,
        },
    };

    const handleSaveBanner = (): void => {
        const bannerSettings: BannerSettings = {
            message: bannerMessage,
            type: bannerType,
            expiryDateTime: expiryEnabled ? expiryDateTime : null,
            logoutAllUsers,
        };

        console.log("Saving banner settings:", bannerSettings);
        // TODO: Server Action save banner
    };

    const handleClearBanner = (): void => {
        setBannerMessage("");
        setBannerType(BANNER_TYPES.general);
        setExpiryEnabled(false);
        setExpiryDateTime("");
        setLogoutAllUsers(false);

        console.log("Clearing banner settings");
        // TODO: Server action clear banner
    };

    return (
        <div className="mx-auto mt-2">
            <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
                {/* Main Settings Card */}
                <Card className="shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">
                            Banner Settings
                        </h2>
                        <p className="text-xs text-gray-500">
                            Configure banner appearance and behavior
                        </p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Message Input */}
                        <div className="space-y-2">
                            <Label
                                className="text-sm font-medium text-gray-700"
                                htmlFor="message"
                            >
                                Banner Message
                            </Label>
                            <Input
                                id="message"
                                value={bannerMessage}
                                onChange={(e) => setBannerMessage(e.target.value)}
                                placeholder="Enter banner message"
                                className="h-11 rounded-md border-slate-200"
                            />
                        </div>

                        {/* Banner Type Selection */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Banner Type
                            </Label>
                            <div className="space-y-2">
                                <SelectInput
                                    value={bannerTypes[bannerType]?.label || ""}
                                    onChange={(selectedLabel) => {
                                        const selectedKey = Object.entries(bannerTypes).find(
                                            ([, type]) => type.label === selectedLabel
                                        )?.[0];
                                        if (selectedKey) setBannerType(selectedKey);
                                    }}
                                    options={Object.values(bannerTypes).map(type => type.label)}
                                    placeholder="Select banner type..."
                                    searchPlaceholder="Search banner types..."
                                    emptyText="No banner types found."
                                    className="h-11"
                                />
                                {/* Display selected type with icon */}
                                {bannerType && (
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${bannerTypes[bannerType].bgColor}`}>
                                        <div className={bannerTypes[bannerType].textColor}>
                                            {bannerTypes[bannerType].icon}
                                        </div>
                                        <span className={`text-sm ${bannerTypes[bannerType].textColor}`}>
                                            {bannerTypes[bannerType].label}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Settings Toggles */}
                        <div className="space-y-4 pt-2">
                            {/* Expiry Toggle */}
                            <ToggleButton
                                label="Enable Expiry Time"
                                description="Set a time for the banner to automatically expire"
                                isActive={expiryEnabled}
                                onToggle={() => setExpiryEnabled(!expiryEnabled)}
                            />

                            {expiryEnabled && (
                                <div className="ml-4 mt-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Clock className="h-4 w-4 text-slate-500" />
                                        <Label className="text-sm text-slate-600">
                                            Select Expiry Time (CEST)
                                        </Label>
                                    </div>
                                    <Input
                                        type="datetime-local"
                                        value={expiryDateTime}
                                        onChange={(e) => setExpiryDateTime(e.target.value)}
                                        min={new Date().toISOString().slice(0, 16)}
                                        step="60"
                                        className="h-11 rounded-md border-slate-200"
                                    />
                                </div>
                            )}

                            {/* Logout Toggle */}
                            <ToggleButton
                                label="Logout All Users"
                                description="Will logout all users when the banner is updated"
                                isActive={logoutAllUsers}
                                onToggle={() => setLogoutAllUsers(!logoutAllUsers)}
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <Button
                            onClick={handleSaveBanner}
                            disabled={!bannerMessage.trim() || !bannerType}
                            className={`h-9 px-6 text-white ${!bannerMessage.trim() || !bannerType
                                ? "bg-gray-400 cursor-not-allowed opacity-50"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            Save Banner Settings
                        </Button>
                    </div>
                </Card>

                {/* Preview Card */}
                <Card className="shadow-sm border border-gray-200 overflow-hidden h-fit">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">
                            Banner Preview
                        </h2>
                        <p className="text-xs text-gray-500">
                            Live preview of banner appearance
                        </p>
                    </div>

                    <div className="p-6">
                        {bannerMessage ? (
                            <div
                                className={`flex items-center justify-center gap-3 ${bannerTypes[bannerType].bgColor} ${bannerTypes[bannerType].borderColor} border py-3 px-4 rounded-md`}
                            >
                                <div className={bannerTypes[bannerType].textColor}>
                                    {bannerTypes[bannerType].icon}
                                </div>
                                <p className={`${bannerTypes[bannerType].textColor} text-sm`}>
                                    {bannerMessage}
                                    {expiryEnabled && expiryDateTime && (
                                        <span className="font-bold ml-1">
                                            (
                                            {new Date(expiryDateTime).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            })}{" "}
                                            CEST).
                                        </span>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                <MessageSquare className="h-8 w-8 mb-2" />
                                <p className="text-sm">Enter a message to see preview</p>
                            </div>
                        )}
                    </div>

                    {/* Clear Banner Button */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                        <Button
                            onClick={handleClearBanner}
                            className="bg-orange-600 hover:bg-orange-700 h-9 px-6 text-white"
                        >
                            Clear current banner
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BannerManagementClient;